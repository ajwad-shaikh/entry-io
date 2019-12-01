import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Autocomplete from '@material-ui/lab/AutoComplete';
import fire from './fire';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: 'none',
  },
  paper: {
    margin: theme.spacing(2, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function CheckInForm(props) {
  const classes = useStyles();

  const [value, setValue] = React.useState('');

  const defaultProps = {
    options: hostList,
    getOptionLabel: option => option.title,
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (message, variant) => {
    enqueueSnackbar(message, {
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'bottom',
      },
      variant: variant,
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const sendEmail = postData => {
    const response = axios.post(
      'https://us-central1-entry-io.cloudfunctions.net/function-1',
      postData,
      { headers: { 'Content-Type': 'application/json' } },
    );
    console.log(response);
  };

  const handleResult = event => {
    event.preventDefault();
    const data = event.target;
    const timestamp = Date.now();
    var hostEmail = '';
    hostList.find((host, i) => {
      if (host.title === data.host.value) {
        hostEmail = host.email;
        return true; // stop searching
      } else return false;
    });
    fire
      .database()
      .ref('check-ins/' + data.phone.value)
      .set({
        name: data.name.value,
        phone: data.phone.value,
        email: data.email.value,
        checkin_ts: timestamp,
        host: data.host.value,
        host_email: hostEmail,
      })
      .then(function() {
        const postData = {
          dest: 'host',
          host: data.host.value,
          guest: data.name.value,
          phone: data.phone.value,
          guestEmail: data.email.value,
          hostEmail: hostEmail,
          checkinTime: timestamp,
        };
        sendEmail(postData);
        document.getElementById('checkin-form').reset();
        handleClick(
          'Thanks for checking into TheCoolCompany, see you around!',
          'success',
        );
        handleChange(1, '');
      });
  };

  return (
    <form id="checkin-form" className={classes.root} onSubmit={handleResult}>
      <TextField
        variant="standard"
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        autoComplete="name"
        autoFocus
        inputProps={{
          maxLength: 40,
        }}
      />
      <TextField
        variant="standard"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        inputProps={{
          maxLength: 40,
        }}
      />
      <TextField
        variant="standard"
        margin="normal"
        required
        fullWidth
        name="phone"
        label="Phone Number"
        type="number"
        id="phone"
        autoComplete="phone"
        InputProps={{
          startAdornment: <InputAdornment position="start">+91</InputAdornment>,
        }}
        inputProps={{
          maxLength: 10,
          minLength: 10,
        }}
      />
      <Autocomplete
        {...defaultProps}
        id="host"
        value={value}
        onChange={handleChange}
        renderInput={params => (
          <TextField
            {...params}
            label="Host"
            variant="standard"
            margin="dense"
            required
            fullWidth
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        className={classes.submit}
      >
        Check-In at TheCoolCompany
      </Button>
    </form>
  );
}

const hostList = [
  { title: 'Cool CEO', email: 'shaikhajwad10@gmail.com' },
  { title: 'Geek Tech Lead', email: 'shaikhajwad10@gmail.com' },
  { title: 'Mighty HR', email: 'shaikhajwad10@gmail.com' },
  { title: 'Persistent Marketer', email: 'shaikhajwad10@gmail.com' },
  { title: 'Punny Social Media Manager', email: 'shaikhajwad10@gmail.com' },
];

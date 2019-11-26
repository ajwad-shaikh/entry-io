import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Autocomplete from '@material-ui/lab/AutoComplete';
import fire from './fire';

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
  },
  paper: {
    margin: theme.spacing(2, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

function handleResult(event) {
  event.preventDefault();
  const data = event.target;
  console.log(data.phone.value);
  const timestamp = Date.now();
  fire
    .database()
    .ref('check-ins/' + data.phone.value)
    .set({
      name: data.name.value,
      phone: data.phone.value,
      email: data.email.value,
      checkin_ts: timestamp,
      host: data.host.value,
    });
}

export default function CheckInForm() {
  const classes = useStyles();

  const defaultProps = {
    options: top100Films,
    getOptionLabel: option => option.title,
  };

  return (
    <form className={classes.root} onSubmit={handleResult}>
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
      />
      <Autocomplete
        {...defaultProps}
        id="host"
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
        Check In @ The Cool Company
      </Button>
    </form>
  );
}

const top100Films = [
  { title: 'Cool CEO' },
  { title: 'Geek Tech Lead' },
  { title: 'Mighty HR' },
  { title: 'Persistent Marketer' },
  { title: 'Punny Social Media Manager' },
];

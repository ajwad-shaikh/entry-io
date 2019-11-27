import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
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

export default function CheckOutForm() {
  const classes = useStyles();

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
    console.log(data.phone.value);
    const timestamp = Date.now();
    fire
      .database()
      .ref('check-ins/' + data.phone.value)
      .once('value')
      .then(function(snapshot) {
        if (snapshot.val() === null || snapshot.val() === '') {
          return handleClick(
            'You seem to not have checked-in before, please check-in first!',
            'error',
          );
        }
        const details = {
          name: snapshot.val().name,
          email: snapshot.val().email,
          host: snapshot.val().host,
          hostEmail: snapshot.val().host_email,
          checkin_ts: snapshot.val().checkin_ts,
          checkout_ts: timestamp,
          phone: snapshot.val().phone,
        };
        fire
          .database()
          .ref('check-outs/' + details.checkout_ts + '_' + details.phone)
          .set(details)
          .then(function() {
            fire
              .database()
              .ref('check-ins/' + data.phone.value)
              .set(null);
          })
          .then(function() {
            const postData = {
              dest: 'guest',
              host: snapshot.val().host,
              guest: snapshot.val().name,
              phone: snapshot.val().phone,
              guestEmail: snapshot.val().email,
              hostEmail: snapshot.val().host_email,
              checkinTime: snapshot.val().checkin_ts,
              checkoutTime: timestamp,
            };
            sendEmail(postData);
            document.getElementById('checkout-form').reset();
            return handleClick(
              'Thank you for visiting TheCoolCompany, you have been succesfully checked-out ;)',
              'success',
            );
          });
      });
  };

  return (
    <form id="checkout-form" className={classes.root} onSubmit={handleResult}>
      <FormLabel>
        <Typography>Phone Number</Typography>
      </FormLabel>
      <TextField
        variant="standard"
        margin="normal"
        required
        fullWidth
        name="phone"
        type="number"
        id="phone"
        autoComplete="phone"
        InputProps={{
          startAdornment: <InputAdornment position="start">+91</InputAdornment>,
        }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Check me Out!
      </Button>
    </form>
  );
}

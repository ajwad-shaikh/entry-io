import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
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
  const timestamp = Date.now() + '_' + data.phone.value;
  fire
    .database()
    .ref('check-ins/' + data.phone.value)
    .once('value')
    .then(function(snapshot) {
      const details = {
        name: snapshot.val().name,
        email: snapshot.val().email,
        host: snapshot.val().host,
        checkin_ts: snapshot.val().checkin_ts,
        checkout_ts: Date.now(),
        phone: snapshot.val().phone,
      };
      fire
        .database()
        .ref('check-outs/' + details.phone)
        .set(details)
        .then(function() {
          fire
            .database()
            .ref('check-ins/' + data.phone.value)
            .set(null);
        });
    });
}

export default function CheckOutForm() {
  const classes = useStyles();

  return (
    <form className={classes.form} onSubmit={handleResult}>
      <FormLabel>
        <Typography>Phone Number</Typography>
      </FormLabel>
      <TextField
        variant="outlined"
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
        Check Out like a Boss!
      </Button>
    </form>
  );
}

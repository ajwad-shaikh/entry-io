import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FunctionTabs from './FunctionTabs';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';

function Copyright() {
  return (
    <Typography variant="body1" color="textSecondary" align="center">
      {'Made with  '}
      <Icon className="fab fa-react" />
      {'  '}
      <Icon className="fab fa-github" />
      {'  '}
      <Icon className="fab fa-google" />
      {'  '}
      <Icon className="fab fa-node-js" />
      {'  &  '}
      <Icon className="fas fa-heart" />
      {'  by '}
      <Link color="inherit" href="https://ajwad-shaikh.github.io/">
        <strong>Ajwad Shaikh</strong>
      </Link>
      {'  - '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  sub: {
    marginBottom: 10,
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(2, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    overflow: 'hidden',
  },
}));

export default function AppLayout() {
  const classes = useStyles();

  React.useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
  }, []);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
        <div className={classes.paper}>
          <Typography className={classes.header} variant="h2" center="center">
            entry.io
          </Typography>
          <Typography className={classes.sub} variant="h5" align="center">
            Chowkidaar at TheCoolCompany
          </Typography>
          <FunctionTabs />
          <Box mt={3} className={classes.footer}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}

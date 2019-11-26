import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined';
import NextWeekOutlinedIcon from '@material-ui/icons/NextWeekOutlined';
import CheckInForm from './CheckInForm';
import CheckOutForm from './CheckOutForm';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab
          label="Check-In"
          icon={<MeetingRoomOutlinedIcon />}
          {...a11yProps(0)}
        />
        <Tab
          label="Check-Out"
          icon={<NextWeekOutlinedIcon />}
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <CheckInForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CheckOutForm />
      </TabPanel>
    </div>
  );
}

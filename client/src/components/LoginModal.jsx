import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Face from '@material-ui/icons/Face';
import Fingerprint from '@material-ui/icons/Fingerprint';
import Email from '@material-ui/icons/Email';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#EDF5E1',
    color: '#05386B',
  },
  title: {
    flexGrow: 1,
  },
  margin: {
    margin: 16,
  },
  padding: {
    padding: 8,
  },
  dialog: {
    backgroundColor: '#edf5e1',
  },
  tab: {
    backgroundColor: '#e8e8e8',
  }
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Header({ open, handleClose, authenticateUser, createAccount }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogContent className={classes.dialog}>
        <Box className={classes.root}>
          <AppBar position="static">
            <Tabs value={value} onChange={handleTabChange} indicatorColor="primary" textColor="primary" aria-label="simple tabs example">
              <Tab label="Login" {...a11yProps(0)} className={classes.tab}/>
              <Tab label="Sign Up" {...a11yProps(1)} className={classes.tab}/>
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <Face />
              </Grid>
              <Grid item md={true} sm={true} xs={true}>
                <TextField id="loginUsername" label="Username" type="email" fullWidth autoFocus required />
              </Grid>
            </Grid>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <Fingerprint />
              </Grid>
              <Grid item md={true} sm={true} xs={true}>
                <TextField id="loginPassword" label="Password" type="password" fullWidth required />
              </Grid>
            </Grid>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <FormControlLabel control={
                  <Checkbox
                    color="primary"
                  />
                } label="Remember" />
              </Grid>
              <Grid item>
                <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
              </Grid>
            </Grid>
            <Grid container justify="center" style={{ marginTop: '10px' }}>
              <Button variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={authenticateUser}>Login</Button>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <Face />
              </Grid>
              <Grid item md={true} sm={true} xs={true}>
                <TextField id="username" label="Username" type="email" fullWidth autoFocus required />
              </Grid>
            </Grid>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <Fingerprint />
              </Grid>
              <Grid item md={true} sm={true} xs={true}>
                <TextField id="password" label="Password" type="password" fullWidth required />
              </Grid>
            </Grid>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <Email />
              </Grid>
              <Grid item md={true} sm={true} xs={true}>
                <TextField id="email" label="Email" type="email" fullWidth required />
              </Grid>
            </Grid>
            <Grid container justify="center" style={{ marginTop: '10px' }}>
              <Button variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={createAccount}>Sign Up</Button>
            </Grid>
          </TabPanel>
        </Box>
      </DialogContent>
    </Dialog> 
  );
}
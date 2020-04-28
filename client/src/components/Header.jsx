import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LoginModal from './LoginModal';
import AccountMenu from './AccountMenu';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LinkedInIcon from '@material-ui/icons/LinkedIn';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#EDF5E1',
    color: '#05386B',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
  largeAvatar: {
    width: 200,
    height: 200,
    float: 'right',
  },
  link: {
    color: 'inherit',
  },
  by: {
    color: 'black',
  },
  learnMore: {
    textDecoration: 'underline',
    fontWeight: 'bold',
    margin: 6
  }
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h3" className={classes.title}>{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Header({ apiKey, username, authenticateUser, createAccount, logout }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [graphOpen, setGraphOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [learnModalOpen, setLearnModal] = React.useState(false);
  
  const openLearnModel = () => {
    setLearnModal(true);
  }
  
  const closeLearnModal = () => {
    setLearnModal(false);
  }

  const handleAccountClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountClose = () => {
    setAnchorEl(null);
  };

  const handleLoginOpen = () => {
    setOpen(true);
  };

  const handleLoginClose = () => {
    setOpen(false);
  };

  const handleGraphOpen = () => {
    setGraphOpen(true);
  };

  const handleGraphClose = () => {
    setGraphOpen(false);
  };

  let allowLogin = (user) => {
    if (user === 'Guest') {
      return <Button color="inherit" onClick={handleLoginOpen}>Login</Button>
    } else {
      return <Button color="inherit" onClick={handleAccountClick}>{username}</Button>
    }
  }

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          IndoorRock API
          <Typography variant="body1" component="span" className={classes.by}>
            &ensp;By Aston Khor
            <Button onClick={openLearnModel} className={classes.learnMore}>Learn More</Button>
            <Dialog onClose={closeLearnModal} aria-labelledby="customized-dialog-title" open={learnModalOpen}>
              <DialogTitle id="customized-dialog-title" onClose={closeLearnModal}>
                Hi I'm Aston!
                <Avatar alt="Aston Khor" src="AstonKhor.jpg" className={classes.largeAvatar}></Avatar>
              </DialogTitle>
              <DialogContent dividers>
                <Typography gutterBottom>
                  Indoor Rock API is a small project of mine to create an open API that serves up scraped indoor gym data. I wanted to challenge myself to create the application with new technologies/techniques such as:
                  <Typography component="ul">
                    <Typography component="li">WebScraping</Typography>
                    <Typography component="li">Material UI</Typography>
                    <Typography component="li">User Authentication - Salting/Hashing</Typography>
                    <Typography component="li">Cookies/Sessions</Typography>
                    <Typography component="li">API KEY generation</Typography>
                    <Typography component="li">Deployment on Heroku</Typography>
                    <Typography component="li">Mapbox map</Typography>
                    <Typography component="li">Page Speed Optimization - Compression</Typography>
                    <Typography component="li">Page Speed Optimization - Server Caching</Typography>
                  </Typography>
                </Typography>
              </DialogContent>
              <DialogActions>
                <a href="mailto:khoraston@gmail.com" className={classes.link}><EmailIcon></EmailIcon></a>
                <a href="https://github.com/AstonKhor/indoor-rock-api" className={classes.link}><GitHubIcon></GitHubIcon></a>
                <AccountCircleIcon></AccountCircleIcon>
                <a href="https://www.linkedin.com/in/aston-khor/" className={classes.link}><LinkedInIcon></LinkedInIcon></a>
              </DialogActions>
            </Dialog>
          </Typography>
        </Typography>
        {allowLogin(username)}
        <AccountMenu apiKey={apiKey} anchorEl={anchorEl} handleAccountClose={handleAccountClose} logout={logout}></AccountMenu>
        <LoginModal open={open} handleClose={handleLoginClose} authenticateUser={authenticateUser} createAccount={createAccount}/>
      </Toolbar>
    </AppBar>
  );
}
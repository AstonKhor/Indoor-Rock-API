import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LoginModal from './LoginModal';
import AccountMenu from './AccountMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#EDF5E1',
    color: '#05386B',
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
  }
}));

export default function Header({ apiKey, username, authenticateUser, createAccount, logout }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleAccountClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountClose = () => {
    setAnchorEl(null);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  let allowLogin = (user) => {
    if (user === 'Guest') {
      return <Button color="inherit" onClick={handleClickOpen}>Login</Button>
    } else {
      return <Button color="inherit" onClick={handleAccountClick}>{username}</Button>
    }
  }

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          IndoorRock API
        </Typography>
        {allowLogin(username)}
        <AccountMenu apiKey={apiKey} anchorEl={anchorEl} handleAccountClose={handleAccountClose} logout={logout}></AccountMenu>
        <LoginModal open={open} handleClose={handleClickClose} authenticateUser={authenticateUser} createAccount={createAccount}/>
      </Toolbar>
    </AppBar>
  );
}
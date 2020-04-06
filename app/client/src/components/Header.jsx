import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#5CDB95',
    color: '#05386B',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header({ username }) {
  const classes = useStyles();

  let allowLogin = (user) => {
    if (user === 'Guest') {
      return <Button color="inherit">Login</Button>
    } else {
      return <Button color="inherit">Username</Button>
    }
  }

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          IndoorRock API
        </Typography>
        {allowLogin(username)}
      </Toolbar>
    </AppBar>
  );
}
import React, { useRef, useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

let useStyles = makeStyles({
  collapse: {
    position: 'absolute',
    width: '550px',
    marginLeft: '-275px',
    left: '50%',
    top: '10%',
  },
})


export default function AccountMenu({ apiKey, anchorEl, handleAccountClose, logout }) {
  const classes = useStyles();
  const [alertVisible, setAlertVisible] = useState(false)
  const keyRef = useRef(null);

  const copyToClipboard = (e) => {
    const node = keyRef.current;

    if (document.body.createTextRange) {
      const range = document.body.createTextRange();
      range.moveToElementText(node);
      range.select();
    } else if (window.getSelection) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(node);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      console.warn("Could not select text in node: Unsupported browser.");
    }
    document.execCommand('copy');
    e.target.focus();
  }

  return (
    <Box>
      <Collapse in={alertVisible} className={classes.collapse}>
        <Alert
          action={
            <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setAlertVisible(false);
            }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          className={classes.copyKey}
          >
          <AlertTitle>API Key Copied to Clipboard</AlertTitle>
          <Typography varient="body1">
            API Key: 
            <Typography variant="body1" component="span" ref={keyRef}>
              {apiKey}
            </Typography>
          </Typography>
        </Alert>
      </Collapse>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleAccountClose}
        >
        <MenuItem onClick={(e) => {handleAccountClose(); setAlertVisible(true); copyToClipboard(e); }}>API Key</MenuItem>
        <MenuItem onClick={() => {handleAccountClose(); logout(); }}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}
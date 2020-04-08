import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

let ParamChip = ({ param, removeParam }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Chip
        key={`${param.type}: ${param.param}`}
        label={`${param.type}: ${param.param}`}
        onClick={() => {removeParam(param)}}
        onDelete={() => {removeParam(param)}}
      />
    </Box>
  );
}

export default ParamChip;
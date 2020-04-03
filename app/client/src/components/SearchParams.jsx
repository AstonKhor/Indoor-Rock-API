import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ParamChip from './ParamChip';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

let SearchParams = ({ params, removeParam }) => {
  let styles = useStyles();
  return (
    <React.Fragment>
      {params.map((param) => (
        <ParamChip key={`${param.tpe}${param.param}`} param={param} removeParam={removeParam}/>
      ))}
    </React.Fragment>
  );
}

export default SearchParams;



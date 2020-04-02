import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ResultCard from './ResultCard';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  }
}));

export default function Results({ gyms, params}) {
  const classes = useStyles();
  let resultGyms = [];
  for(let i = 0; i < gyms.length; i++) {
    for(let j = 0; j < params.length; j++) {
      if(gyms[i][params[j].type] === params[j].param) {
        resultGyms.push(gyms[i])
        break;
      }
    }
  }
  console.log('gyms', resultGyms);
  return (
    <Grid container justify="center" spacing={2}>
      {resultGyms.map((gym) => (
        <Grid key={`${gym.Id}${gym.Country}`} item>
          <ResultCard gym={gym}></ResultCard>
        </Grid>
      ))}
    </Grid>
  );
}
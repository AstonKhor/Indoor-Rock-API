import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ResultCard from './ResultCard';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  }
}));

export default function Results({ gyms, params}) {
  const classes = useStyles();
  let resultGyms = [];
  if (params.length === 0) {
    resultGyms = gyms;
  } else {
    for(let i = 0; i < gyms.length; i++) {
      for(let j = 0; j < params.length; j++) {
        if(gyms[i][params[j].type] === params[j].param) {
          resultGyms.push(gyms[i])
          break;
        }
      }
    }
  }
  return (
    <Grid container justify="center" spacing={2}>
      {resultGyms.map((gym) => (
        <Grid key={`${gym.Id}${gym.Country}`} item>
          <LazyLoadComponent>
            <ResultCard gym={gym}></ResultCard>
          </LazyLoadComponent>
        </Grid>
      ))}
    </Grid>
  );
}
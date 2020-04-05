import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ResultCard from './ResultCard';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Results({ gyms, params}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
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
  let pageGyms = [];
  for (let i = 0; i < resultGyms.length; i++) {
    if (i < page * 10 && i >= (page-1) * 10) {
      pageGyms.push(resultGyms[i]);
    }
  }

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Grid container justify="center" spacing={2}>
      <Pagination count={Math.ceil(resultGyms.length / 10)} page={page} onChange={handlePageChange} />
      {pageGyms.map((gym) => (
        <Grid key={`${gym.Id}${gym.Country}`} item>
          <ResultCard gym={gym}></ResultCard>
        </Grid>
      ))}
    </Grid>
  );
}
import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ResultCard from './ResultCard';
import Pagination from '@material-ui/lab/Pagination';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: '0px 10px 10px',
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#EDF5E1',
    color: '#05386B'
  },
  pagination: {
    display: 'flex',
    alignSelf: 'center',
  }
}));

const ResultCardsContainer = withStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  }
})(Container)

export default function Results({ selectedGyms, page, setPage }) {
  const classes = useStyles();
  let pageGyms = [];
  for (let i = 0; i < selectedGyms.length; i++) {
    if (i < page * 10 && i >= (page-1) * 10) {
      pageGyms.push(selectedGyms[i]);
    }
  }

  return (
    <Grid container className={classes.root} justify="center" spacing={2}>
      <Pagination className={classes.pagination}count={Math.ceil(selectedGyms.length / 10)} page={page} onChange={setPage}/>
      <ResultCardsContainer>
        {pageGyms.map((gym) => (
          <Grid key={`${gym.Id}${gym.Country}`} item>
            <ResultCard gym={gym}></ResultCard>
          </Grid>
        ))}
      </ResultCardsContainer>
    </Grid>
  );
}

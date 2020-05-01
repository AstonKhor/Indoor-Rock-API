import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Pagination from '@material-ui/lab/Pagination';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

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
  },
  gymListing: {
    borderRadius: 10,
    backgroundColor: '#e8ffc4',
  },
  listSecondaryContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
}));

export default function Results({ selectedGyms, page, setPage }) {
  const classes = useStyles();
  let pageGyms = [];
  for (let i = 0; i < selectedGyms.length; i++) {
    if (i < page * 10 && i >= (page-1) * 10) {
      pageGyms.push(selectedGyms[i]);
    }
  }

  const renderWebsite = (gym) => {
    if (gym.website) {
      return <a href={gym.website}>Website</a>
    }
  }

  const renderPhone = (gym) => {
    if (gym.phone) {
    return <Typography variant="body1" component="div">{gym.phone}</Typography>
    }
  }

  const renderAddress = (gym) => {
    if (gym.address) {
      return <Typography variant="body1" component="div">{gym.address}</Typography>
    }
  }

  const renderRating = (gym) => {
    if (gym.rating) {
      return <Rating
      name="simple-controlled"
      value={parseFloat(gym.rating)}
      onChange={(event, newValue) => {
        console.log('adding ratings not yet implemented');
      }}
    />
    }
  }

  return (
    <List className={classes.root}>
      <Pagination className={classes.pagination}count={Math.ceil(selectedGyms.length / 10)} page={page} onChange={setPage}/>
      {pageGyms.map((gym) => (
        <React.Fragment>
          <ListItem div key={`${gym.id}${gym.country}`}>
            <ListItemText primary={gym.gymname} secondary={
              <Box className={classes.listSecondaryContainer}>
                <Typography color="textSecondary" component="span">
                  {renderWebsite(gym)}
                  {renderPhone(gym)}
                  {renderAddress(gym)}
                  {renderRating(gym)}
                </Typography>
                <Button size="small" href={gym.website}>Learn More</Button>
              </Box>
            } />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}

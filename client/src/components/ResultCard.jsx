import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'clsx';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    margin: 5,
    borderRadius: 16, // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    maxWidth: 500,
    marginLeft: 'auto',
    overflow: 'initial',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function Results({ gym }) {
  const classes = useStyles();
  const shadowStyles = useOverShadowStyles();
  
  const renderWebsite = () => {
    if (gym.Website) {
      return <a href={gym.Website}>Website</a>
    }
  }

  const renderPhone = () => {
    if (gym.Phone) {
    return <Typography variant="body1" component="div">{gym.Phone}</Typography>
    }
  }

  const renderAddress = () => {
    if (gym.Address) {
      return <Typography variant="body1" component="div">{gym.Address}</Typography>
    }
  }

  const renderRating = () => {
    if (gym.Rating) {
      return <Rating
      name="simple-controlled"
      value={gym.Rating}
      onChange={(event, newValue) => {
        console.log('adding ratings not yet implemented');
      }}
    />
    }
  }
  console.log(gym);
  return (
    <Card className={cx(classes.root, shadowStyles.root)} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
        {gym.GymName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {renderWebsite()}
          {renderPhone()}
          {renderAddress()}
          {renderRating()}
        </Typography>
        <Typography variant="h5" component="h2">
          Description
        </Typography>
        <Typography variant="body2" component="p">
          description--
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
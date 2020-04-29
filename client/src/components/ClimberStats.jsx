import React from 'react';
import Card from '@material-ui/core/Card';
import clsx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import { useEffect } from 'react';
import createGraph from '../methods/createBoxPlot';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  card: {
    margin: 'auto',
    marginTop: '15px',
    width: '750px',
    borderRadius: 20,
    backgroundColor: '#EDF5E1',
    color: '#05386B',
    paddingLeft: '20px',
    paddingRight: '20px',
    transitionDuration: '1s',
    overflow: 'hidden',
  },
  moreInfo: {
    color: '#05386B',
    margin: 'auto',
  },
  httpRequest: {
    margin: '10px 25px',
    lineHeight: '60px',
    borderRadius: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#e3e3e3',
  },
  expand: {
    color: '#05386B',
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  largeAvatar: {
    width: 100,
    height: 100,
    float: 'right',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  graph: {
    width: '700px',
    height: '600px',
    margin: 'auto',
  },
  graphContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    marginTop: '15px',
  },
  graphButton: {
    backgroundColor:  '#EDF5E1',
    color: '#05386B',
    borderRadius: '8px',
    fontSize: '20px',
    marginBottom: '10px',
    fontWeight: 'bold',
    width: '500px',
    overflow: 'hidden',
  },
  graphBody: {
    display: 'none',
  }
}));

const ClimberStats = ({ apiKey }) => {
  const classes = useStyles();
  const [expandedGraph, setExpandedGraph] = React.useState(false);
  const [height, setHeight] = React.useState(145);
  

  const handleExpandGraphClick = () => {
    let graphBody = document.getElementById("graphBody");
    let root = document.getElementById('root');
    if (expandedGraph) {
      root.style.height = '1100px'
      graphBody.style.display = "block";
    } else {
      root.style.height = '145px'
      setTimeout(() => {
        graphBody.style.display = "none";
      }, 900)
    }
    setExpandedGraph(!expandedGraph);
  };

  useEffect(() => {
    createGraph();
    handleExpandGraphClick();
  }, [])

  return (
    <Card id="root" class={classes.card}>
      <CardContent>
        <Typography variant="h4">
          Climbing Stats
        </Typography>
        <CardActions disableSpacing>
          <IconButton
            className={classes.moreInfo}
            onClick={handleExpandGraphClick}
            aria-expanded={expandedGraph}
            aria-label="show more"
          >
            <Typography variant="body1">Click For Some Interesting Stats</Typography>
            <ExpandMoreIcon className={clsx(classes.expand, {
              [classes.expandOpen]: expandedGraph,
            })}/>
          </IconButton>
        </CardActions>
        <span id="graphBody" class={classes.graphBody}>
          <Box class={classes.graphContainer}>
            <Typography variant="h5">
              Climbing Grade vs Time Spent to "Level up"
            </Typography>
            <Box class={classes.graph} id="climbGraph"></Box>
            <Typography variant="h5">
              The Dataset
            </Typography>
            <Typography variant="body1">
              Data here was grabbed from the longest standing and largest climbing logbook, <a href="8a.nu">8a.nu</a>, and was <a href="https://www.kaggle.com/dcohen21/8anu-climbing-logbook">scraped</a> by David Cohen in September 2017.
            </Typography>
            <br/>
            <Typography variant="body1">
              This study looks at 1,236,200 Boulder Ascents parsed down to 76,810 Unique User's Grade Climbs and 16,876 Unique Climbers. In looking at any dataset it should be noted the implicit biases of the data. In this particular case, climbers who regularly log data into 8a.nu are most likely skilled and dedicated. As such, the data will be skewed in the direction of very regular training climbers.
            </Typography>
            <br/>

            <Typography variant="h5">
              Take Away
            </Typography>
            <Typography variant="body1">
              Grades progressively take longer to improve from. As you progress in climbing the amount of energy/time spent to improve a single grade appears to increase.
            </Typography>
            <br/>
          </Box>
        </span>
      </CardContent>
    </Card>
  )

}

export default ClimberStats;



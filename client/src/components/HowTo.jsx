import React from 'react';
import Card from '@material-ui/core/Card';
import clsx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  card: {
    margin: '30px 45px',
    width: '1000px',
    borderRadius: 20,
    backgroundColor: '#EDF5E1',
    color: '#05386B'
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
  link: {
    color: 'inherit',
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
    overflow: 'hidden',
  }
}));

const HowToUse = ({ apiKey }) => {
  const classes = useStyles();
  const [expandedGet, setExpandedGet] = React.useState(false);
  const [expandedPost, setExpandedPost] = React.useState(false);

  const handleExpandGetClick = () => {
    setExpandedGet(!expandedGet);
  };
  const handleExpandPostClick = () => {
    setExpandedPost(!expandedPost);
  };

  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4"> About IndoorRock API</Typography>
          <Typography variant="body1"> IndoorRock is an open API for easy access to scraped data on indoor rock climbing gyms across the world </Typography>
          <Typography variant="h4"> Requests </Typography>
          <Typography variant="h5"> HTTP Requests </Typography>
          <Typography variant="body1" className={classes.httpRequest}> GET https://www.IndoorRockAPI.com/indoorgyms/api/json </Typography>
          <CardActions disableSpacing>
            <IconButton
              className={classes.moreInfo}
              onClick={handleExpandGetClick}
              aria-expanded={expandedGet}
              aria-label="show more"
            >
              <Typography variant="body1">MORE INFO</Typography>
              <ExpandMoreIcon className={clsx(classes.expand, {
                [classes.expandOpen]: expandedGet,
              })}/>
            </IconButton>
          </CardActions>
          <Collapse in={expandedGet} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h5"> Parameters </Typography>
              <Typography variant="body1"> The following table lists the parameters that this query supports. All of the parameters listed are query parameters. </Typography>
              <TableContainer component={Paper}>
                <Table aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3}>
                        Parameters
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={3}>
                        Required Parameters
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell rowSpan={1}>
                        key
                      </TableCell>
                      <TableCell colSpan={2}>
                        string
                        <br/>
                        The key parameter specifies the 36 character string associated with your account. It can be viewed on login.
                        <br/>
                        <Button>{apiKey}</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3}>
                        Filters (specify any number of filters)
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell rowSpan={1}>
                        country
                      </TableCell>
                      <TableCell colSpan={2}>
                        string
                        <br/>
                        This parameter specifies the country in which you would like to recieve gyms. The parameter is not case sensitive.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell rowSpan={1}>
                        region
                      </TableCell>
                      <TableCell colSpan={2}>
                        string
                        <br/>
                        This parameter specifies the region in which you would like to recieve gyms. The parameter is not case sensitive.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell rowSpan={1}>
                        subregion
                      </TableCell>
                      <TableCell colSpan={2}>
                        string
                        <br/>
                        This parameter specifies the subregion in which you would like to recieve gyms. The parameter is not case sensitive.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="h5"> Request Body </Typography>
              <Typography variant="body1"> Do not provide a request body when calling this method. </Typography>
              <Typography variant="h5"> Response </Typography>
              <Typography variant="body1"> If successful, this method returns a response body with the following structure: </Typography>
              <Typography variant="body1">  </Typography>
            </CardContent>
          </Collapse>
          <Typography variant="body1" className={classes.httpRequest}> POST https://www.IndoorRockAPI.com/indoorgyms/api/ </Typography>
          <CardActions disableSpacing>
            <IconButton
              className={classes.moreInfo}
              onClick={handleExpandPostClick}
              aria-expanded={expandedPost}
              aria-label="show more"
            >
              <Typography variant="body1">MORE INFO</Typography>
              <ExpandMoreIcon className={clsx(classes.expand, {
                [classes.expandOpen]: expandedPost,
              })}/>
            </IconButton>
          </CardActions>
          <Collapse in={expandedPost} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h5"> Parameters </Typography>
              <Typography variant="body1"> The following table lists the parameters that this query supports. All of the parameters listed are query parameters. </Typography>
              <TableContainer component={Paper}>
                <Table aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3}>
                        Parameters
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={3}>
                        Required Parameters
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell rowSpan={1}>
                        key
                      </TableCell>
                      <TableCell colSpan={2}>
                        string
                        <br/>
                        The key parameter specifies the 36 character string associated with your account. It can be viewed on login.
                        <br/>
                        <Button>{apiKey}</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3}>
                        Filters (specify any number of filters)
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell rowSpan={1}>
                        country
                      </TableCell>
                      <TableCell colSpan={2}>
                        string
                        <br/>
                        This parameter specifies the country in which you would like to recieve gyms. The parameter is not case sensitive.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell rowSpan={1}>
                        region
                      </TableCell>
                      <TableCell colSpan={2}>
                        string
                        <br/>
                        This parameter specifies the region in which you would like to recieve gyms. The parameter is not case sensitive.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell rowSpan={1}>
                        subregion
                      </TableCell>
                      <TableCell colSpan={2}>
                        string
                        <br/>
                        This parameter specifies the subregion in which you would like to recieve gyms. The parameter is not case sensitive.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="h5"> Request Body </Typography>
              <Typography variant="body1"> Do not provide a request body when calling this method. </Typography>
              <Typography variant="h5"> Response </Typography>
              <Typography variant="body1"> Endpoint is still in beta and may not work</Typography>
              <Typography variant="body1">  </Typography>
            </CardContent>
          </Collapse>
        </CardContent>
      </Card>
    </Box>
  )

}

export default HowToUse;



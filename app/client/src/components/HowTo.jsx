import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

let HowToUse = ({ apiKey }) => {
  let styles = useStyles();
  return (
    <React.Fragment>      
      <Card>
        <CardContent>
          <Typography variant='h4'> Requests </Typography>
          <Typography variant='h5'> HTTP Requests </Typography>
          <Typography variant='body1'> GET https://www.IndoorRockAPI.com/indoorgyms/api/json </Typography>
          <Typography variant='h5'> Parameters </Typography>
          <Typography variant='body1'> The following table lists the parameters that this query supports. All of the parameters listed are query parameters. </Typography>
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
          <Typography variant='h5'> Request Body </Typography>
          <Typography variant='body1'> Do not provide a request body when calling this method. </Typography>
          <Typography variant='h5'> Response </Typography>
          <Typography variant='body1'> If successful, this method returns a response body with the following structure: </Typography>
          <Typography variant='body1'>  </Typography>
          <Button>{apiKey}</Button>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}

export default HowToUse;



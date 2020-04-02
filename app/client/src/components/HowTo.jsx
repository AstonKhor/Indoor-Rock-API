import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { makeStyles } from '@material-ui/core/styles';

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
        <CardMedia
          image={
            'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Git_icon.svg/2000px-Git_icon.svg.png'
          }
        />
        <CardContent>
          <TextInfoContent
            overline={'28 MAR 2019'}
            heading={'How to Use IndoorRock API'}
            body={
              `Your API key:`
            }
          />
          <Button>{apiKey}</Button>
        </CardContent>
      </Card>

    </React.Fragment>
  )
}

export default HowToUse;



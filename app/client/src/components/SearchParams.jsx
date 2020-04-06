import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

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

let SearchParams = ({ params, clearParams }) => {
  let styles = useStyles();

  const renderCountry = (country) => {
    if (country) {
      //add some onclick function here
      return <Typography variant="body1">
        >> {country} 
      </Typography>
    }
  }

  const renderRegion = (region) => {
    if (region) {
      //add some onclick function here
      return <Typography variant="body1">
        >> {region} 
      </Typography>
    }
  }

  const renderSubregion = (subregion) => {
    if (subregion) {
      //add some onclick function here
      return <Typography variant="body1">
        >> {subregion} 
      </Typography>
    }
  }

  return (
    <React.Fragment>
      {renderCountry(params.country)}
      {renderRegion(params.region)}
      {renderSubregion(params.subregion)}
      <Button 
        variant="contained"
        onClick={clearParams}>
          Clear Search
        </Button>
    </React.Fragment>
  );
}

export default SearchParams;



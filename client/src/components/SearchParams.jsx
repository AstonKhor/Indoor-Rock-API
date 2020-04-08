import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 20,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#EDF5E1',
    color: '#05386B'
  },
  listItem: {
    fontWeight: 'bold'
,  }
});

const ParamContainer = withStyles({
  root: {
    height: 75,
    display: 'flex',
    flexDirection: 'column',
  }
})(Container);

let SearchParams = ({ params, clearParams }) => {
  let classes = useStyles();

  const renderCountry = (country) => {
    country = country ? country : 'All';
    return <Typography variant="body1" className={classes.listItem}>
      Country: {country} 
    </Typography>
  }

  const renderRegion = (region) => {
    region = region ? region : 'All';
    return <Typography variant="body1" className={classes.listItem}>
      Region: {region} 
    </Typography>
  }

  const renderSubregion = (subregion) => {
    subregion = subregion ? subregion : 'All';
    return <Typography variant="body1" className={classes.listItem}>
      Subregion: {subregion} 
    </Typography>
  }

  return (
    <Container className={classes.root}>
      <ParamContainer>
        {renderCountry(params.country)}
        {renderRegion(params.region)}
        {renderSubregion(params.subregion)}
      </ParamContainer>
      <Button 
        variant="contained"
        onClick={clearParams}>
          Clear Search
        </Button>
    </Container>
  );
}

export default SearchParams;



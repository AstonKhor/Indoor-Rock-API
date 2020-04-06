import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 20,
    padding: 10,
    border: '2px solid black',
    color: '#05386B',
  },
  listItem: {
    '&:hover, &:focus': {
      color: '#379683',
      opcaity: 1,
    }
  }
});

const Search = ({ addParam, params, locations }) => {
  const classes = useStyles();
  let renderList = () => {
    if (!params.country) {
      let countries = Object.keys(locations);
      return (<Container>
        <Typography variant="h5">Country</Typography>
        {countries.map((country)=> (
          <Typography 
            variant="subtitle1" 
            key={`${country}SearchItem`}
            onClick={() => {addParam(country, 'country')} }
            className={classes.listItem}>
            {country}
          </Typography>
        ))}
      </Container>)
    } else if (!params.region) {
      let regions = Object.keys(locations[params.country]);
      return (<Container>
        <Typography variant="h5">Region</Typography>
        {regions.map((region)=> (
          <Typography 
            variant="subtitle1" 
            key={`${region}SearchItem`}
            onClick={() => {addParam(region, 'region')} }>
            {region}
          </Typography>
        ))}
      </Container>)
    } else if (!params.subregion) {
      let subregions = Object.keys(locations[params.country][params.region]);
      return (<Container>
        <Typography variant="h5">SubRegion</Typography>
        {subregions.map((subregion)=> (
          <Typography 
            variant="subtitle1" 
            key={`${subregion}SearchItem`}
            onClick={() => {addParam(subregion, 'subregion')} }>
            {subregion}
          </Typography>
        ))}
      </Container>)
    }
  }

  return (
    <Container className={classes.root}>
      {renderList()}
    </Container>
  )
}

export default Search;



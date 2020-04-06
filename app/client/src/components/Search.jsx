import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

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

const Search = ({ addParam, params, locations }) => {
  const classes = useStyles();
  console.log(locations);
  let renderList = () => {
    if (!params.country) {
      let countries = Object.keys(locations);
      return (<Container>
        <Typography variant="h5">Country</Typography>
        {countries.map((country)=> (
          <Typography 
            variant="subtitle1" 
            key={`${country}SearchItem`}
            onClick={() => {addParam(country, 'country')} }>
            {country}
          </Typography>
        ))}
      </Container>)
    } else if (!params.region) {
      let regions = Object.keys(locations[params.country]);
      console.log('regions', regions);
      return (<Container>
        <Typography variant="h5">Region</Typography>
        {regions.map((region)=> (
          <Typography 
            variant="subtitle1" 
            key={`${region}SearchItem`}
            onClick={() => {addParam(region, 'region')} }>
            {console.log('here', region)}{region}
          </Typography>
        ))}
      </Container>)
    } else if (!params.subregion) {
      let subregions = Object.keys(locations[params.country][params.region]);
      console.log('subregions', subregions);
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
    <React.Fragment>
      {renderList()}
    </React.Fragment>
  )
}

export default Search;



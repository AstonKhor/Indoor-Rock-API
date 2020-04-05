import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

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

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countriesOpen: false,
      countriesAnchorEl: null,
      regionsOpen: false,
      regionsAnchorEl: null,
      subregionsOpen: false,
      subregionsAnchorEl: null,
    }
    // this.styles = useStyles();
    this.handleExpand = this.handleExpand.bind(this);
    this.anchorElCountries = this.anchorElCountries.bind(this);
    this.anchorElRegions = this.anchorElRegions.bind(this);
    this.anchorElSubregions = this.anchorElSubregions.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleExpand(selected) {
    console.log('here', `${selected}Open`);
    console.log(this.state[`${selected}Open`])
    this.setState({
      [`${selected}Open`]: !this.state[`${selected}Open`]
    })
  }

  anchorElCountries(event) {
    this.setState({
      countriesAnchorEl: event.currentTarget,
      countriesOpen: true,
    })
  };

  anchorElRegions(event) {
    this.setState({
      regionsAnchorEl: event.currentTarget,
      regionsOpen: true,
    })
  };

  anchorElSubregions(event) {
    this.setState({
      subregionsAnchorEl: event.currentTarget,
      subregionsOpen: true,
    })
  };

  handleClose(callback = ()=>{}) {
    this.setState({
      countriesAnchorEl: null,
      countriesOpen: false,
      regionsOpen: false,
      subregionsOpen: false,
    }, callback)
  };

  render() {
    return (
      <React.Fragment>
        {/* <Autocomplete
          id="grouped search"
          options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option.title}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="With categories" variant="outlined" />}
        /> */}
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.anchorElCountries}>
          Countries
        </Button>
        <Menu
          id="long-menu"
          keepMounted
          anchorEl={this.state.countriesAnchorEl}
          open={this.state.countriesOpen}
          onClose={() => { this.handleClose(); }}
          PaperProps={{
            style: {
              maxHeight: 61 * 4.5,
              width: '20ch',
            },
          }}
        >
          {Array.from(this.props.countries).map((country) => (
            <MenuItem key={country} onClick={() => {this.handleClose(() => { this.props.addParam(country, 'Country'); })}}>
              {country}
            </MenuItem>
          ))}
        </Menu>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.anchorElRegions}>
          Regions
        </Button>
        <Menu
          id="long-menu"
          keepMounted
          anchorEl={this.state.regionsAnchorEl}
          open={this.state.regionsOpen}
          onClose={() => { this.handleClose(); }}
          PaperProps={{
            style: {
              maxHeight: 61 * 4.5,
              width: '20ch',
            },
          }}
        >
          {Array.from(this.props.regions).map((region) => (
            <MenuItem key={region} onClick={() => {this.handleClose(() => { this.props.addParam(region, 'Region'); })}}>
              {region}
            </MenuItem>
          ))}
        </Menu>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.anchorElSubregions}>
          Subregion
        </Button>
        <Menu
          id="long-menu"
          keepMounted
          anchorEl={this.state.subregionsAnchorEl}
          open={this.state.subregionsOpen}
          onClose={() => { this.handleClose(); }}
          PaperProps={{
            style: {
              maxHeight: 61 * 4.5,
              width: '20ch',
            },
          }}
        >
          {Array.from(this.props.subregions).map((subregion) => (
            <MenuItem key={subregion} onClick={() => {this.handleClose(() => { this.props.addParam(subregion, 'Subregion'); })}}>
              {subregion}
            </MenuItem>
          ))}
        </Menu>

      </React.Fragment>
    )
  }
}


export default Search;



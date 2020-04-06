import React from 'react';
import HowTo from './HowTo';
import Search from './Search';
import Header from './Header';
import Container from '@material-ui/core/Container';
import Results from './Results';
import SearchParams from './SearchParams';
import Traversal from './Traversal';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: 'Guest',
      key: 'Please Login or Signup to receive an API Key',
      gyms: [],
      searchParams: {country: null, region: null, subregion: null},
      locations: {},
      countries: new Set(),
      regions: new Set(),
      subregions: new Set()
    }
    this.removeParam = this.removeParam.bind(this);
    this.addParam = this.addParam.bind(this);
    this.clearParams = this.clearParams.bind(this);
  }

  componentDidMount() {
    fetch('/indoorGyms/api/json')
      .then((resp) => resp.json())
      .then((gyms) => {
        console.log('GYMS', gyms);
        let locations = {};
        let countries = new Set();
        let regions = new Set();
        let subregions = new Set();
        for (let i = 0; i < gyms.length; i++) {
          if (!locations[gyms[i].Country]) {
            locations[gyms[i].Country] = {};
          }
          if (!locations[gyms[i].Country][gyms[i].Region]) {
            locations[gyms[i].Country][gyms[i].Region] = {};
          }
          if(gyms[i].Subregion) {
            locations[gyms[i].Country][gyms[i].Region][gyms[i].Subregion] = {}
          }
        }
        this.setState({
          gyms: gyms,
          locations: locations,
          countries: Array.from(countries),
          regions: Array.from(regions),
          subregions: Array.from(subregions),
        })
      })
      .catch((err) => {
        throw err;
      })
  }

  addParam(value, type) {
    let searchParams = Object.assign({}, this.state.searchParams);
    searchParams[type] = value
    this.setState({
      searchParams: searchParams,
    })
  }

  clearParams() {
    this.setState({
      searchParams: {country: null, region: null, subregion: null},
    })
  }

  removeParam(clickedParam) {
    let searchParams = this.state.searchParams.filter((param) => { return param !== clickedParam});
    this.setState({
      searchParams: searchParams
    })
  }

  render() {
    return (
      <React.Fragment>
        <Header username={this.state.user}/>
        <HowTo apiKey={this.state.key}/>
        <Container>
          <Container>
            <SearchParams params={this.state.searchParams} clearParams={this.clearParams}/>
            <Search addParam={this.addParam} params={this.state.searchParams} locations={this.state.locations}></Search>
          </Container>
          <Results gyms={this.state.gyms} params={this.state.searchParams} countries={this.state.countries} regions={this.state.regions} subregions={this.state.subregions}/>
        </Container>
      </React.Fragment>
    )
  }
}

export default App;
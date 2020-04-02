import React from 'react';
import HowTo from './HowTo';
import Search from './Search';
import Header from './Header';
import { Container } from '@material-ui/core';
import Results from './Results';
import SearchParams from './SearchParams';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: 'Guest',
      key: 'Please Login or Signup to receive an API Key',
      gyms: [],
      searchParams: [{type: 'Country', param: 'Argentina'}],
      countries: new Set(),
      regions: new Set(),
      subregions: new Set()
    }
    this.removeParam = this.removeParam.bind(this);
  }

  componentDidMount() {
    fetch('/indoorGyms/api/json')
      .then((resp) => resp.json())
      .then((gyms) => {
        console.log('GET gyms', gyms);
        let countries = new Set();
        let regions = new Set();
        let subregions = new Set();
        for (let i = 0; i < gyms.length; i++) {
          countries.add(gyms[i].country)
          regions.add(gyms[i].subregions)
          subregions.add(gyms[i].location)
        }

        this.setState({
          gyms: gyms,
          countries: countries,
          regions: regions,
          subregions: subregions
        })
      })
      .catch((err) => {
        throw err;
      })
  }

  removeParam(removeParam) {
    let searchParams = this.state.searchParams.filter((param) => { return param !== removeParam});
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
            <SearchParams params={this.state.searchParams} removeParam={this.removeParam}/>
            <Search countries={this.state.countries} regions={this.state.regions} subregions={this.state.subregions}></Search>
          </Container>
          <Results gyms={this.state.gyms} params={this.state.searchParams} countries={this.state.countries} regions={this.state.regions} subregions={this.state.subregions}/>
        </Container>
      </React.Fragment>
    )
  }
}

export default App;
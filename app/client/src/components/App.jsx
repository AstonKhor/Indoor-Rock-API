import React from 'react';
import HowTo from './HowTo';
import Search from './Search';
import Header from './Header';
import Container from '@material-ui/core/Container';
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
    this.addParam = this.addParam.bind(this);
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
          countries.add(gyms[i].Country);
          regions.add(gyms[i].Region);
          subregions.add(gyms[i].Subregion);
        }
        //update search component state
        //then update this state
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

  addParam(param, type) {
    let exists = false;
    let searchParams = [];
    for (let i = 0; i < this.state.searchParams.length; i++) {
      if(this.state.searchParams[i].type === type && this.state.searchParams[i].param ===param) {
        exists = true;
        return;
      }
      searchParams.push({type: this.state.searchParams[i].type, param: this.state.searchParams[i].param })
    }
    searchParams.push({type: type, param: param })
    this.setState({
      searchParams: searchParams
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
            <SearchParams params={this.state.searchParams} removeParam={this.removeParam}/>
            <Search countries={this.state.countries} regions={this.state.regions} subregions={this.state.subregions} addParam={this.addParam}></Search>
          </Container>
          <Results gyms={this.state.gyms} params={this.state.searchParams} countries={this.state.countries} regions={this.state.regions} subregions={this.state.subregions}/>
        </Container>
      </React.Fragment>
    )
  }
}

export default App;
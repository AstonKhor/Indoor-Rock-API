import React from 'react';
import HowTo from './HowTo';
import Search from './Search';
import Header from './Header';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Results from './Results';
import SearchParams from './SearchParams';

const AppContainer = withStyles({
  root: {
    margin: -8,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#8EE4AF',
  }
})(Box);

const SearchAndResultsContainer = withStyles({
  root: {
    margin: '10px 70px',
    display: 'flex',
    flexDirection: 'row',
  }
})(Box);

const SearchContainer = withStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 400,
  }
})(Box);

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: 'Guest',
      key: 'Please Login or Signup to receive an API Key',
      gyms: [],
      searchParams: {country: null, region: null, subregion: null},
      locations: {},
      selectedGyms: [],
      resultPage: 1,
    }
    this.removeParam = this.removeParam.bind(this);
    this.addParam = this.addParam.bind(this);
    this.clearParams = this.clearParams.bind(this);
    this.setPage = this.setPage.bind(this);
  }

  componentDidMount() {
    fetch('/indoorGyms/api/json')
      .then((resp) => resp.json())
      .then((gyms) => {
        console.log('GYMS', gyms);
        let locations = {};
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
          selectedGyms: gyms,
          locations: locations,
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
    }, this.updateSelectedGyms);
  }
  
  clearParams() {
    this.setState({
      searchParams: {country: null, region: null, subregion: null},
    }, this.updateSelectedGyms);
  }

  createAccount(name, password, email) {
    console.log('creating account!');
  }

  removeParam(clickedParam) {
    let searchParams = this.state.searchParams.filter((param) => { return param !== clickedParam});
    this.setState({
      searchParams: searchParams
    })
  }

  setPage(event, pageNum) {
    this.setState({
      resultPage: pageNum
    })  
  }
  
  updateSelectedGyms() {
    let selectedGyms = [];
    let gyms = this.state.gyms;
    let params = this.state.searchParams;

    for (let i = 0; i < gyms.length; i++) {
      if (!params.country) {
        return this.setState({
          selectedGyms: gyms,
        })
      } else {
        if (gyms[i].Country === params.country) {
          if (!params.region) {
            selectedGyms.push(gyms[i]);
          } else {
            if (gyms[i].Region === params.region) {
              if (!params.subregion) {
                selectedGyms.push(gyms[i]);
              } else {
                if (gyms[i].Subregion === params.subregion) {
                  selectedGyms.push(gyms[i]);
                }
              }
            } 
          }
        }
      }
    }
    this.setState({
      selectedGyms: selectedGyms,
    });
  }

  render() {
    return (
      <AppContainer>
        <Header username={this.state.user} createAccount={this.createAccount}/>
        <HowTo apiKey={this.state.key}/>
        <SearchAndResultsContainer>
          <SearchContainer>
            <SearchParams params={this.state.searchParams} clearParams={this.clearParams}/>
            <Search addParam={this.addParam} params={this.state.searchParams} locations={this.state.locations}></Search>
          </SearchContainer>
          <Results selectedGyms={this.state.selectedGyms} page={this.state.resultPage} setPage={this.setPage}/>
        </SearchAndResultsContainer>
      </AppContainer>
    )
  }
}

export default App;
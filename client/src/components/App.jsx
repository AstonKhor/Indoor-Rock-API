import React from 'react';
import HowTo from './HowTo';
import Search from './Search';
import Header from './Header';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Results from './Results';
import SearchParams from './SearchParams';
import getCookie from '../methods/getCookie';
import clearCookies from'../methods/clearCookies';
import MapBox from './MapBox';

const AppContainer = withStyles({
  root: {
    margin: -8,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
  }
})(Box);

const BodyContainer = withStyles({
  root: {
    margin: '10px 70px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'sticky',
    top: 0,
    left: 0,
  }
})(Box);

const SearchContainer = withStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 275,
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
    this.checkSession = this.checkSession.bind(this);
    this.authenticateUser = this.authenticateUser.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    fetch('/indoorGyms/api/json')
      .then((resp) => resp.json())
      .then((gyms) => {
        console.log('GYMS', gyms);
        gyms = gyms.rows;
        let locations = {};
        for (let i = 0; i < gyms.length; i++) {
          if (!locations[gyms[i].country]) {
            locations[gyms[i].country] = {};
          }
          if (!locations[gyms[i].country][gyms[i].region]) {
            locations[gyms[i].country][gyms[i].region] = {};
          }
          if(gyms[i].subregion) {
            locations[gyms[i].country][gyms[i].region][gyms[i].subregion] = {}
          }
        }
        this.setState({
          gyms: gyms,
          selectedGyms: gyms,
          locations: locations,
        }, this.checkSession)
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

  authenticateUser() {
    let username = document.getElementById('loginUsername').value;
    let password = document.getElementById('loginPassword').value;
    fetch(`/login?username=${username}&password=${password}`)
      .then((resp) => {
        if(resp.status === 200) {
          this.checkSession()
        }
        return resp.json()})
      .then((data) => {
        console.log('login resp', data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  checkSession() {
    let sessionKey = getCookie('sessionKey');
    if (sessionKey) {
      fetch(`/checkSession?sessionKey=${sessionKey}`)
        .then((resp) => {
          if (resp.status !== 200) {
            return {username: 'Guest', key: 'Please Login or Signup to receive an API Key'};
          }
          return resp.json()
        })
        .then((data) => {
          this.setState({
            user: data.username,
            key: data.key,
          })
        })
    }
  }
  
  clearParams() {
    this.setState({
      searchParams: {country: null, region: null, subregion: null},
    }, this.updateSelectedGyms);
  }

  createAccount() {
    let bodyData = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      email: document.getElementById('email').value,
    }
    fetch('/user', 
      {
        method: 'POST', 
        body: JSON.stringify(bodyData), 
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
  }

  logout() {
    clearCookies();
    console.log('here logging out');
    this.setState({
      user: 'Guest', 
      key: 'Please Login or Signup to receive an API Key'
    });
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
        if (gyms[i].country === params.country) {
          if (!params.region) {
            selectedGyms.push(gyms[i]);
          } else {
            if (gyms[i].region === params.region) {
              if (!params.subregion) {
                selectedGyms.push(gyms[i]);
              } else {
                if (gyms[i].subregion === params.subregion) {
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
        <Header apiKey={this.state.key} username={this.state.user} authenticateUser={this.authenticateUser} createAccount={this.createAccount} logout={this.logout}/>
        <HowTo apiKey={this.state.key}/>
        <BodyContainer>
          <SearchContainer>
            <SearchParams params={this.state.searchParams} clearParams={this.clearParams}/>
            <Search addParam={this.addParam} params={this.state.searchParams} locations={this.state.locations}></Search>
          </SearchContainer>
          <Results selectedGyms={this.state.selectedGyms} page={this.state.resultPage} setPage={this.setPage}/>
          <MapBox></MapBox>
        </BodyContainer>
      </AppContainer>
    )
  }
}

export default App;
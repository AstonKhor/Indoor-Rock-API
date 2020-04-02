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
      key: '**Not Logged In**',
      gyms: []
    }
  }

  componentDidMount() {
    fetch('/indoorGyms/api/json')
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          gyms: data
        })
      })
      .catch((err) => {
        throw err;
      })
  }

  render() {
    return (
      <React.Fragment>
        <Header/>
        <HowTo apiKey={this.state.key}/>
        <Container>
          <Container>
            <SearchParams></SearchParams>
            <Search></Search>
          </Container>
          <Results/>
        </Container>
      </React.Fragment>
    )
  }
}

export default App;
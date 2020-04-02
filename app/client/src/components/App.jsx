import React from 'react';
import HowTo from './HowTo';
import Search from './Search';
import Header from './Header';
import { Container } from '@material-ui/core';
import Results from './Results';
import SearchParams from './ParamChip';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: 'Guest',
      key: '**Not Logged In**',
      gyms: [],
      searchParams: [{type: 'country', param: 'United States'}]
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
        <Header username={this.state.user}/>
        <HowTo apiKey={this.state.key}/>
        <Container>
          <Container>
            <SearchParams params={this.state.searchParams}/>
            <Search></Search>
          </Container>
          <Results/>
        </Container>
      </React.Fragment>
    )
  }
}

export default App;
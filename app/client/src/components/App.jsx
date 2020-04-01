import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    fetch('/indoorGyms')
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      })
  }

  render() {
    return (
      <React.Fragment>
        <div>
          Hello World
        </div>
      </React.Fragment>
    )
  }
}

export default App;
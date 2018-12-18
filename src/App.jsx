import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {
    state = {
        test: ''
    }
    
    componentDidMount() {
        axios.get('/app').then( res => {
            this.setState({test: res.data})
        })
    }
  render() {
    return (
      <div className="App">
          <h4>Web Socket Streaming Data Test</h4>
          <p>{this.state.test}</p>
      </div>
    );
  }
}

export default App;

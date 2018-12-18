import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

class App extends Component {

    componentDidMount() {
        socket.on('priceUpdate', (data) => {
            this.props.dispatch({
                type: 'UPDATE', payload:
                {
                    price: Number(data.data.c).toFixed(2),
                    time: data.time
                }
            });
        })
    }
    render() {
        return (
            <div className="App">
                <h3>Web Socket Streaming Data Test</h3>
                <h5>BTC Price: <span id='price'>{this.props.reduxStore.btc.price}</span></h5>
                <h5>Update time: <span id='time'>{this.props.reduxStore.btc.time}</span></h5>
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapReduxStateToProps)(App);

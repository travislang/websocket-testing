import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import axios from 'axios';

import io from 'socket.io-client';



class App extends Component {
    state = {
        symbols: []
    }

    getSymbols = () => {
        axios.get('/binance')
            .then(res => {
                let logos = [];
                for (let item in res.data.data) {
                    logos.push(res.data.data[item]);
                }
                console.log(logos);
                this.setState({
                    symbols: logos
                })
            }).catch( err => {
                console.log('error in symb get:', err);
            })
    }

    componentDidMount() {
        this.getSymbols();
        
        
        
        // const socket = io('http://localhost:5000');
        // socket.on('priceUpdate', (data) => {
        //     this.props.dispatch({
        //         type: 'UPDATE', payload:
        //         {
        //             price: Number(data.data.c).toFixed(2),
        //             time: data.time
        //         }
        //     });
        // })
    }

    // category: "coin"
    // date_added: "2017-10-01T00:00:00.000Z"
    // id: 2010
    // logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png"
    // name: "Cardano"
    // platform: null
    // slug: "cardano"
    // symbol: "ADA"
    // tags: null

    render() {
        return (
            <div className="App">
                <h3>Web Socket Streaming Data Test</h3>
                <h5>BTC Price: <span id='price'>${this.props.reduxStore.btc.price}</span></h5>
                <h5>Update time: <span id='time'>{this.props.reduxStore.btc.time}</span></h5>
                <br />
                <div>
                    {this.state.symbols.map((item, i) => {
                        return (<div key={i}><h4>{item.name}</h4><img alt='' src={item.logo} /></div>)
                    })}
                </div>
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapReduxStateToProps)(App);

const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const moment = require('moment');
const axios = require('axios');
const WebSocket = require('ws');
const io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(express.static('build'));

app.get('/app', (req, res ) => {
    res.send('working')
})

app.get('/binance', (req, res) => {
    console.log('made it to binance route');
    
    axios.get('https://api.binance.com/api/v1/exchangeInfo')
    .then(response => {
        let symbols = response.data.symbols.filter(item => {
            if (item.quoteAsset === 'BTC' || item.quoteAsset === 'ETH' || item.quoteAsset === 'USDT') {
                return item
            }
        });
        symbols = symbols.filter((item, i, self) => {
            return i === self.findIndex(t => {
                return t.baseAsset === item.baseAsset
            })
        })
        let logoSymbols = symbols.map(item => {
            return item.baseAsset
        });
        let badSymbols = ['BCHSV', 'BQX', 'HSR', 'IOTA', 'RPX', 'YOYO']
        logoSymbols = logoSymbols.filter( item => {
            return !badSymbols.includes(item);
        })
        logoSymbols = logoSymbols.join(',');
        axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?CMC_PRO_API_KEY=09d5358c-06e3-4939-8260-f2ab9669e948&symbol=${logoSymbols}`).then(resp => {
            res.send(resp.data)
        }).catch( err => {
            console.log('error in cmc get:', err);
            res.sendStatus(500);
        })            
    }).catch( err => {
        console.log('error:',err);
    })
})

//**SOCKET.IO FOR CLIENT/SERVER COMMUNICATION**//
// io.on('connection', function (socket) {
//     console.log('a user connected');
//     socket.on('disconnect', function () {
//         console.log('user disconnected')
//     })
// });

//**WEBSOCKET FOR API DATA**//

//function to make sure socket is still connected
// function heartbeat() {
//     console.log('recieved ping from server');
// }

// let ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@miniTicker');
// //<symbol>@miniTicker
// //!miniTicker@arr
// ws.on('open', () => {
//     console.log('binance stream open');
// });

// ws.on('ping', heartbeat);

// //listening for data stream
// ws.on('message', function (data) {
//     let time = moment(JSON.parse(data).E).format('h:mm:ss a')
//     console.log(time);
//     io.emit('priceUpdate', { data: JSON.parse(data), time: time })
// });

server.listen(port, function () {
    console.log('Listening on port: ', port);
});

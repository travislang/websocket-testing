const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const moment = require('moment');

const WebSocket = require('ws');
const io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(express.static('build'));

app.get('/app', (req, res ) => {
    res.send('working')
})

//**SOCKET.IO FOR CLIENT/SERVER COMMUNICATION**//
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected')
    })
});

//**WEBSOCKET FOR API DATA**//

//function to make sure socket is still connected
function heartbeat() {
    clearTimeout(this.pingTimeout);
    this.pingTimeout = setTimeout(() => {
        this.terminate();
    }, 30000 + 5000);
    ws.send('pong');
}

let ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@miniTicker');
//<symbol>@miniTicker
//!miniTicker@arr
ws.on('open', () => {
    console.log('binance stream open');
    heartbeat();
});

ws.on('ping', heartbeat);

//listening for data stream
ws.on('message', function (data) {
    let time = moment(JSON.parse(data).E).format('h:mm:ss a')
    io.emit('priceUpdate', { data: JSON.parse(data), time: time })
});

server.listen(port, function () {
    console.log('Listening on port: ', port);
});

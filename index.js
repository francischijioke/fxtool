const express = require('express');
const app = express();

const server = app.listen(4100, (err) => {
    console.log('Running port 4100...')
})

//websocket server
const MyWebsocketServer = require('./ws_root')
//helpers
const FxPriceExtractor = require('./app/Http/Helpers/FxPriceExtractor')


//start websocket server
const workingSocket = new MyWebsocketServer(server);

//start price extractor engine
const PriceExtractor =  new FxPriceExtractor();
PriceExtractor.startPriceExtrator();

app.get('/', (req, res) => {
    res.send('Working Fine!')
})


global.MyWorkingSocket = workingSocket;

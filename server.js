const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const proxy = require('http-proxy-middleware')

const movie = require('./data/movie.js')

mongoose.connect('mongodb://localhost:27017/movielist', {useNewUrlParser: true});

const server = express();
const port = 4000;

server.use(bodyparser.json());
server.use(bodyparser.urlencoded({extended:true}));

// server.use('/api',proxy({
//     target:'http://localhost:8000',
//     changeOrigin:true
// }))

server.use('/api',movie);

server.listen(port,()=>{
    console.log('listening on port 4000');
});

module.exports = server;
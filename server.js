const express = require('express');
const server = express();

const projectRoute = require('./router/projectRoute');
const actionRoute = require('./router/actionRoute');

server.use(express.json());
server.use('/api/actions', actionRoute);
server.use('/api/projects', projectRoute);

server.get('/', (req, res) => {
    res.send(`<h1>API is up and running</h1>`);
});

function logger(req, res, next){
    console.log(
        `[${new Date().toISOString}] ${req.method} to ${req.url} from ${req.get('Origin')}`
    );
    next();
}

module.exports = server;
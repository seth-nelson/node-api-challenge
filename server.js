const express = require('express');
const server = express();

const actionRoute = require('./router/actionRoute');
const projectRoute = require('./router/projectRoute');

server.use(express.json());
server.use('/actions', actionRoute);
server.use('/projects', projectRoute);



module.exports = server;
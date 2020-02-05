const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/restricted-middleware');
const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');
const inputsRouter = require('../inputs/inputs-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.send('Welcome to Real Sauti Studios');
});

server.use('/api/auth', authRouter);
server.use('/api/users', authenticate, usersRouter);
server.use('/api/inputs', authenticate, inputsRouter);

module.exports = server;

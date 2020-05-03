const express = require('express');
require('dotenv').config;

const authRouter = require('../auth/authRouter');
const userRouter = require('../users/userRouter')


const todoRoutes = require('../todos/todo-router');

const server = express();
// read todos from req.body and enable addition to todos array
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);
server.use('/api/todos', todoRoutes);

module.exports = server;
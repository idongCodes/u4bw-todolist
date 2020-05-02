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



// server.use('/', (req, res) => res.send('ToDo API up and running!'));



// server.get('/todos', (req, res) => {
//     const sortField = req.query.sortby || 'id';

//     const response = todos.sort((a, b) => (a[sortField] < b[sortField] ? -1 : 1));

//     res.status(200).json(response);
// });

// server.post('/todos', (req, res) => {
//     const todo = req.body;
//     todo.id = nextId++;

//     todos.push(todo);

//     res.status(201).json(todos);
// });

// server.put('/todos/:id', (req, res) => {
   
// });

// server.delete('/todos/:id', (req, res) => {
//     const { id } = req.params;

//     res.status(200).json({ url: `/todos/${ id }`, operation: `DELETE for todo with id ${ id }`});
// });

module.exports = server;
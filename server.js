const express = require('express');

const todoRoutes = require('./todoRoutes');

const server = express();
// read todos from req.body and enable addition to todos array
// server.use(express.json());

server.use('/todos', todoRoutes);



server.use('/', (req, res) => res.send('ToDo API up and running!'));

server.get('/signin', (req, res) => {
    res.status(200).send('<h1>Log In Here</h1>');
});

server.get('/signup', (req, res) => {
    res.status(200).send('<h1>Register Here</h1>');
});

server.get('/todos', (req, res) => {
    const sortField = req.query.sortby || 'id';

    const response = todos.sort((a, b) => (a[sortField] < b[sortField] ? -1 : 1));

    res.status(200).json(response);
});

server.post('/todos', (req, res) => {
    const todo = req.body;
    todo.id = nextId++;

    todos.push(todo);

    res.status(201).json(todos);
});

server.use('/todos/:id', (req, res) => {
   
});

server.delete('/todos/:id', (req, res) => {
    const { id } = req.params;

    res.status(200).json({ url: `/todos/${ id }`, operation: `DELETE for todo with id ${ id }`});
});

const port = 3050;
server.listen(port, () => console.log(`=== Server/API Listening on port ${ port } ===`));
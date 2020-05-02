const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('hello from the GET /todos endpoint');
});

router.get('/:id', (req, res) => {
    res.status(200).send('hello from the GET /todos/:id endpoint');
});

router.post('/', (req, res) => {
    res.status(200).send('hello from the POST /todos endpoint');
});

router.put('/:id', (req, res) => {
    const todo = todos.find(t => t.id == req.params.id); // find matching id for req task

    // if task not found send this error message
    if (!todo) {
        res.status(404).json({ message: 'Task does not exist!' });
        // if task exists , update req task
    } else {
        Object.assign(todo, req.body);

        res.status(200).json(todo);
    }
    
    // res.status(200).send('hello from the PUT /todos/:id endpoint');
});

router.delete('/:id', (req, res) => {
    res.status(200).send('hello from the DELETE /todos/:id endpoint');
});

module.exports = router;
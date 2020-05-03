const router = require('express').Router();
const restricted = require('../auth/restricted-middleware')

const Todos = require('./todo-model');

router.get('/todos', restricted, (req, res) => {

    Todos.find(req.decodedToken.subject)
        .then(users => {
                res.json(users)
        })
        .catch(error => res.status(404).json({ message: 'User does not exist' }))
});

router.post('/todos', restricted, (req, res) => {

    let task = req.body;

    task.user_id = req.decodedToken.subject;

    Todos.add(task).then(tasks => res.json(task)).catch(err => res.status(400).json({ message: 'task not added' }))
});

router.put('/todos/:id', restricted, (req, res) => {
    
    Todos.update(req.body, req.params.id)
        .then(id => {
            
            res.status(201).json({ message: id + ' updated successfully' })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({  message: 'Server error', error })
        })   
});

router.delete('/todos/:id', restricted, (req, res) => {
    const { id } = req.params;

    Todos.remove(id)
        .then(deleted => {
            if(deleted) {
                res.status(200).json({ message: 'Task successfully removed' })
            } else {
                res.status(404).json({ message: 'Could not find task' })
            }
        })
        .catch(() => {
            res.status(500).json({ message: 'There was an error deleting task' })
        })
})

module.exports = router;
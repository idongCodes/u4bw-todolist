const router = require('express').Router();
const restricted = require('../auth/restricted-middleware')

const Todos = require('./todo-model');

router.get('/todos', restricted, (req, res) => {

    Todos.find(req.decodedToken.subject)
        .then(users => {
                res.json(users)
        })
        .catch(error => res.status(400).json({ message: 'User does not exist' }))
})

router.post('/todos', restricted, (req, res) => {

    let task = req.body;

    task.user_id = req.decodedToken.subject;

    Todos.add(task).then(tasks => res.json(task)).catch(err => res.status(400).json({ message: 'task not added' }))
})
module.exports = router;
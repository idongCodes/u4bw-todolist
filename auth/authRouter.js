const bcrypt = require('bcryptjs');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');
const { secret } = require('../auth/secret');

router.post('/signin', (req, res) => {
    let { username, password } = req.body;
    // console.log(username);

    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            console.log(username);
          const token = generateToken(user);
          console.log(user);
          res.status(200).json({ message: `Welcome, ${user.username}!`, token });
        } else {
          res.status(401).json({ message: "User not found" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Error logging in" });
        console.log(error);
      })
});

router.post('/signup', (req, res) => {
    let username = req.body;
    const hash = bcrypt.hashSync(username.password, 10);
    username.password = hash;

    Users.add(username)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(error => {
            res.status(500).json({ message: 'Could not add new user' })
        })
});

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    };

    const options = {
        expiresIn: '1h'
    };

    return jwt.sign(payload, secret, options);
};

module.exports = router;

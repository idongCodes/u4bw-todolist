const router = require("express").Router();

const Users = require("./users-model");
const restricted = require("../auth/restricted-middleware");

router.get("/", (req, res) => {
  Users.find().then((user) => {
    res.json(user);
  });
});

router.get("/me", restricted, (req, res) => {
  const username = req.decodedToken.username;
  console.log(username);

  Users.findBy({ username })
    .then((users) => {
      res.json(users);
    })
    .catch((error) => res.status(400).json({ message: "User does not exist" }));
});

module.exports = router;

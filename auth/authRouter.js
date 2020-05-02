const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model");
const { jwtSecret } = require("../auth/secret");

router.post("/signin", async (req, res) => {
  let { username, password } = req.body;

  try {
    const user = await Users.findBy({ username }).first();
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      return res.status(200).json({
        message: `Welcome ${user.username}`,
        token,
      });
    } else {
      return res.status(401).json({ message: "invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/signup", (req, res) => {
  let username = req.body;
  const hash = bcrypt.hashSync(username.password, 10);
  username.password = hash;

  Users.add(username)
    .then((newUser) => {
      res.status(201).json({ newUser });
    })
    .catch((error) => {
      res.status(500).json({ message: "Could not add new user" });
      console.log(error);
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;

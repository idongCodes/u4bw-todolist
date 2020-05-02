const jwt = require("jsonwebtoken");
const { secret } = require('./secret');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
      console.log(token)
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
          console.log(err)
        res.status(401).json({
          message: "not verified",
        });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "no token provided" });
  }
};
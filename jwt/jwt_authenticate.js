const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.SECRET;

function authenticateAdminToken(req, res, next) {
  const token = req.headers.authorization;
  console.log(token);
  if (token === null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }else if (user.username === "admin" && user.role === 1) {
      next();
    }else{
      return res.sendStatus(401);
    }
  });
}

function authenticateUserToken(req, res, next) {
  const token = req.headers.authorization;

  if (token === null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }else if (user.username !== "admin" && user.role === 0) {
      next();
    }else{
      return res.sendStatus(401);
    }
  });
}

module.exports = {
  authenticateAdminToken,
  authenticateUserToken,
};

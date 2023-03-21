const jwt = require('jsonwebtoken');
require("dotenv").config();

 function checkUser(req,res){
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.SECRET);
  return decoded;
}

module.exports = {checkUser}
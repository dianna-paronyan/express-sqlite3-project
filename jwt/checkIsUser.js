const jwt = require('jsonwebtoken');

 function checkUser(req,res){
  const token = req.headers.authorization;
  const decoded = jwt.decode(token);
  return decoded;
}

module.exports = {checkUser}
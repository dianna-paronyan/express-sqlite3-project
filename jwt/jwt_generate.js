
const jwt = require('jsonwebtoken');
require('dotenv').config()

const SECRET = process.env.SECRET;

function generateAccessToken(username,role,id){
    return jwt.sign({username,role,id},SECRET,{expiresIn:'36000s'} )
}

module.exports = {
    generateAccessToken
}
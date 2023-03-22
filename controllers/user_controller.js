const db = require('../index').db;
const {generateAccessToken} = require('../jwt/jwt_generate')
const bcrypt = require("bcrypt");
require('dotenv').config();


async function register({body:{username,password}},res){

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt)
    if(!username){
        const sql = 'INSERT INTO users(username, password,role) VALUES (?,?,?)';
        db.run(sql, [username,hashed_password, 0],(err)=>{
            if(err){
                res.send(JSON.stringify({status:'Error Reigstering'}));
            }
            res.send(JSON.stringify({status: 'User Created'}));
        })
    }else{
        res.send(JSON.stringify({status: 'User already exists'}));
    }
}

async function login({body:{username,password}},res){

    const sql = 'SELECT * FROM users WHERE username=?';
    db.get(sql,[username],await function(err,row){
        if(username === row.username && bcrypt.compare(password, row.password)){
        const token = generateAccessToken(username,row.role,row.id);
        res.send(JSON.stringify({status: 'Logged in', jwt: token}));
    }else{
           res.send(JSON.stringify({status:'Wrong credentials'}));
        }
    })
}

module.exports = {
    register,
    login
}
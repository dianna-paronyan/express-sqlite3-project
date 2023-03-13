const db = require('../index').db;
const {generateAccessToken} = require('../jwt/jwt_generate')
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
require('dotenv').config();


async function register(req,res){
    const username = req.body.username;
    const password = req.body.password;
    const hashed_password = CryptoJS.SHA256(password).toString();
    const sql = 'INSERT INTO users(username, password,role) VALUES (?,?,?)';
    db.run(sql, [username,hashed_password, 0],(err)=>{
        if(err){
            res.send(JSON.stringify({status:'Error Reigstering'}));
        }
        res.send(JSON.stringify({status: 'User Created'}));
    })
}

async function login(req,res){
    const username = req.body.username;
    const password = req.body.password;
    const hashed_password = CryptoJS.SHA256(password).toString();
    const sql = 'SELECT * FROM users WHERE username=?';
    db.get(sql,[username],(err,row)=>{
        if(username === row.username && hashed_password === row.password){
            console.log(row.password);
            const token = generateAccessToken(username,row.role);
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
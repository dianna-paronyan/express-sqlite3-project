const db = require("../index").db;
const {checkUser}  = require('../jwt/checkIsUser')
// const jwt = require('jsonwebtoken');
// require('dotenv').config()

//  function checkUser(req,res){
//   const token = req.headers.authorization;
//   const decoded = jwt.verify(token,process.env.SECRET);
//   // const decoded = jwt.decode(token);
//   console.log(decoded.id);
//   // const username = decoded.username;
//   return decoded;
// }

async function allCartItems(req, res) {
  db.all("SELECT * FROM cartItems", [], (err, data) => {
    res.send(data);
  });
}

async function cartItem(req, res) {
  const user = checkUser(req,res);
  // console.log(user.id);
  db.all(
    'SELECT p.* FROM cartItems c JOIN products p ON c.product_id = p.id WHERE c.cart_id = ?',
    [req.body.cart_id],
    (err, data) => {
      if (err) {
        res.send(JSON.stringify({ response: "Something went wrong" }));
      }
      else if(user.id !== req.body.cart_id){
        return res.sendStatus(403);
      }
        res.send(data);
    }
  );
}

async function createCartItems(req, res) {
  db.run(
    "INSERT INTO cartItems(cart_id,product_id) VALUES(?,?)",
    [req.body.cart_id, req.body.product_id],
    (err) => {
      res.send(JSON.stringify({ response: "created" }));
    }
  );
}

async function updateCartItems(req, res) {
  db.run(
    "UPDATE cartItems SET cart_id = ?, product_id = ? WHERE id=?",
    [req.body.cart_id, req.body.product_id, req.params.id],
    (err) => {
      res.send(JSON.stringify({ response: "updated" }));
    }
  );
}
async function deleteCartItems(req, res) {
  db.run("DELETE FROM cartItems WHERE id=?", [req.params.id], (err) => {
    res.send(JSON.stringify({ response: "deleted" }));
  });
}

module.exports = {
  allCartItems,
  cartItem,
  createCartItems,
  updateCartItems,
  deleteCartItems,
  checkUser
};

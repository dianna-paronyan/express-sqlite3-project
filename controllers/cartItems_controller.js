const db = require("../index").db;
const {checkUser}  = require('../jwt/checkIsUser')

function allCartItems(req, res) {
  db.all("SELECT * FROM cartItems", [], (err, data) => {
    if(err){
			res.send(JSON.stringify({response: "Something went wrong"}))
		}
    res.send(data);
  });
}

function cartItem(req, res) {
  const {cart_id} = req.body;
  const user = checkUser(req,res);
  db.all(
    'SELECT p.* FROM cartItems c JOIN products p ON c.product_id = p.id WHERE c.cart_id = ?',
    [cart_id],
    (err, data) => {
      if (err) {
        res.send(JSON.stringify({ response: "Something went wrong" }));
      }
      else if(user.id !== cart_id){
        return res.sendStatus(403);
      }
        res.send(data);
    }
  );
}

function createCartItems(req, res) {
  const {cart_id,product_id} = req.body;
  const user = checkUser(req,res);

  if(user.id === cart_id){
      db.run(
        "INSERT INTO cartItems(cart_id,product_id,quantity) VALUES(?,?,?)",
        [cart_id, product_id,1],
        (err) => {
          if(err){
           return res.send(JSON.stringify({ response: "Something went wrong" }));
          }
          res.send(JSON.stringify({ response: "created" }));
        }
      );
  }else{
    return res.sendStatus(403);
  }  
}

function updateCartItems(req, res) {
  const {quantity,cart_id,product_id} = req.body;
  const user = checkUser(req,res);

  if(user.id === cart_id){
   
      db.run(
        "UPDATE cartItems SET quantity = ? WHERE cart_id = ? and product_id = ?",
        [quantity, cart_id, product_id],
        (err) => {
          if(err){
           return res.send(JSON.stringify({ response: "Something went wrong" }));
          }
          res.send(JSON.stringify({ response: "updated" }));
        }
      );
    
  }else{
    return res.sendStatus(403);
  }  
}

function deleteCartItems(req, res) {
  const {id} = req.params;
  const {cart_id} = req.body;
  const user = checkUser(req,res);
  if(user.id === req.body.cart_id){
    db.run("DELETE FROM cartItems WHERE  id=? and cart_id=?", [id,cart_id], (err) => {
      console.log(user);
      if(err){
        res.send(JSON.stringify({response:'Something went wrong'}));
      }
      res.send(JSON.stringify({ response: "deleted" }));
    });
  }else{
    return res.sendStatus(403);
  }
  
}

module.exports = {
  allCartItems,
  cartItem,
  createCartItems,
  updateCartItems,
  deleteCartItems,
  checkUser
};



const db = require("../index").db;
const {checkUser}  = require('../jwt/checkIsUser')

async function allCartItems(req, res) {
  db.all("SELECT * FROM cartItems", [], (err, data) => {
    if(err){
			res.send(JSON.stringify({response: "Ыomething went wrong"}))
		}
    res.send(data);
  });
}

async function cartItem(req, res) {
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

async function createCartItems(req, res) {
  const {cart_id,product_id} = req.body;
  const user = checkUser(req,res);
  if(user.id === cart_id){
    db.run(
      "INSERT INTO cartItems(cart_id,product_id) VALUES(?,?)",
      [cart_id, product_id],
      (err) => {
        if(err){
          console.log(err);
         return res.send(JSON.stringify({ response: "Something went wrong" }));
        }
        res.send(JSON.stringify({ response: "created" }));
      }
    );
  }else{
    return res.sendStatus(403);
  }  
}

async function deleteCartItems(req, res) {
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
  // updateCartItems,
  deleteCartItems,
  checkUser
};

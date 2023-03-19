const db = require("../index").db;
const {checkUser}  = require('../jwt/checkIsUser')

async function allCartItems(req, res) {
  db.all("SELECT * FROM cartItems", [], (err, data) => {
    res.send(data);
  });
}

async function cartItem(req, res) {
  const user = checkUser(req,res);
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

async function createCartItems({body:{cart_id,product_id}}, res) {
  db.run(
    "INSERT INTO cartItems(cart_id,product_id) VALUES(?,?)",
    [cart_id, product_id],
    (err) => {
      res.send(JSON.stringify({ response: "created" }));
    }
  );
}

async function updateCartItems({body:{cart_id,product_id}, params:{id}}, res) {
  db.run(
    "UPDATE cartItems SET cart_id = ?, product_id = ? WHERE id=?",
    [cart_id, product_id, id],
    (err) => {
      res.send(JSON.stringify({ response: "updated" }));
    }
  );
}
async function deleteCartItems({params:{id}}, res) {
  db.run("DELETE FROM cartItems WHERE id=?", [id], (err) => {
    if(err){
      res.send(JSON.stringify({response:'Something went wrong'}));
  }
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

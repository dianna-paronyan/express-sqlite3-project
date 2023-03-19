const db = require("../index").db;
const {checkUser}  = require('../jwt/checkIsUser')

async function cart(req, res) {
  db.run("INSERT INTO cart(user_id) VALUES(?)", [req.body.user_id], (err) => {
    res.send(JSON.stringify({ response: "created" }));
  });
}

async function userCart(req, res) {
  const user = checkUser(req,res);
  console.log(user)
  db.all(
    "SELECT * FROM users join cart on users.id = cart.user_id where cart.user_id = ?",
    [req.body.user_id],
    (err, data) => {
      if (err) {
        res.send(JSON.stringify({ response: "Something went wrong" }));
      }
      else if(user.id !== req.body.user_id){
       return res.sendStatus(403);
      }  
        return res.send(data);
    }
  );
}

module.exports = { cart,userCart };

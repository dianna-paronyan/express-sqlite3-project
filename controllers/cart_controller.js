const db = require("../index").db;
const {checkUser}  = require('../jwt/checkIsUser')

function cart(req, res) {
  const {user_id} = req.body;
  const user = checkUser(req,res);
  if(user.id === user_id){
    db.run("INSERT INTO cart(user_id) VALUES(?)", [user_id], (err) => {
      res.send(JSON.stringify({ response: "Cart Created" }));
    });
  }else{
    return res.sendStatus(403);
  }
}

function userCart(req, res) {
  const user = checkUser(req,res);
  const user_id = req.body.user_id
  console.log(user)
  db.all(
    "SELECT * FROM users join cart on  cart.user_id = users.id  where cart.user_id = ?",
    [user_id],
    (err, data) => {
      if (err) {
        res.send(JSON.stringify({ response: "Something went wrong" }));
      }
      else if(user.id !== user_id){
       return res.sendStatus(403);
      }  
        return res.send(data);
    }
  );
}

module.exports = { cart,userCart };

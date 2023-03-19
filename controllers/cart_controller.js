const db = require("../index").db;
const {checkUser}  = require('../jwt/checkIsUser')

async function cart({body:{user_id}}, res) {
  db.run("INSERT INTO cart(user_id) VALUES(?)", [user_id], (err) => {
    res.send(JSON.stringify({ response: "created" }));
  });
}

async function userCart(req, res) {
  const user = checkUser(req,res);
  const user_id = req.body.user_id
  console.log(user)
  db.all(
    "SELECT * FROM users join cart on users.id = cart.user_id where cart.user_id = ?",
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

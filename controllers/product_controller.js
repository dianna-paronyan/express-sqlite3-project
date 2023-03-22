const db = require("../index").db;

function singleProduct({params:{id}}, res) {
  db.get("SELECT * FROM products WHERE id=?", [id], (err, data) => {
    if(err){
      res.send(JSON.stringify({response:'Something went wrong'}));
    }
    res.send(data);
  });
}

module.exports = { singleProduct };

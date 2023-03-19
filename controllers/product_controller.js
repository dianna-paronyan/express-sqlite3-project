const db = require("../index").db;

async function singleProduct({params:{id}}, res) {
  db.get("SELECT * FROM products WHERE id=?", [id], (err, data) => {
    res.send(data);
  });
}

module.exports = { singleProduct };

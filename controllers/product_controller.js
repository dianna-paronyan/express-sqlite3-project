const db = require('../index').db;

async function singleProduct(req,res){
    const id = req.params.id;
    db.get("SELECT * FROM products WHERE id=?", [id], (err, data) => {
        res.send(data);
      });
}

module.exports = {singleProduct}
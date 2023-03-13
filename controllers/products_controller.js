const db = require('../index').db;

async function allProducts(req,res){
    db.all("SELECT * FROM products", [], (err, data) => {
        res.send(data);
      });
}

async function createProduct(req,res){
    
        db.run('INSERT INTO products(image,name,price, description, quantity) VALUES(?,?,?,?,?)', 
        [
            req.body.image,
            req.body.name,
            req.body.price,
            req.body.description,
            req.body.quantity
        ],
        (err)=>{
            if(err){
                res.send(JSON.stringify({response:'Something went wrong'}));
            }
            res.send(JSON.stringify({response:'Product Created'}));
        }
        )
}
async function updateProduct(req,res){

    db.run('UPDATE products SET image=?, name=?, price=?,description=?,quantity=? WHERE id=?', 
    [
        req.body.image,
        req.body.name,
        req.body.price,
        req.body.description,
        req.body.quantity,
        req.params.id
    ],
    (err)=>{
        if(err){
            res.send(JSON.stringify({response:'Something went wrong'}));
        }
        res.send(JSON.stringify({response:'Product Updated'}));
    }
    )
}

async function deleteProduct(req,res){
    db.run('DELETE FROM products WHERE id=?', [req.params.id],
    (err)=>{
        if(err){
            res.send(JSON.stringify({response:'Something went wrong'}));
        }
        res.send(JSON.stringify({response:'Product Deleted'}));
    }
    )
    
}

module.exports = {
    allProducts,
    createProduct,
    updateProduct,
    deleteProduct
}
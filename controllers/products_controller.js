const db = require('../index').db;

async function allProducts(req,res){
    db.all("SELECT * FROM products", [], (err, data) => {
        res.send(data);
    });
}

async function createProduct({body:{image,name,price,description,quantity}}, res){
    db.run('INSERT INTO products(image,name,price, description, quantity) VALUES(?,?,?,?,?)', 
    [image,name,price,description,quantity],
    (err)=>{
        if(err){
            res.send(JSON.stringify({response:'Something went wrong'}));
        }
        res.send(JSON.stringify({response:'Product Created'}));
     }
    )
}
async function updateProduct({body:{image,name,price,description,quantity},params:{id}},res){

    db.run('UPDATE products SET image=?, name=?, price=?,description=?,quantity=? WHERE id=?', 
    [image,name,price,description,quantity,id],
    (err)=>{
        if(err){
            res.send(JSON.stringify({response:'Something went wrong'}));
        }
        res.send(JSON.stringify({response:'Product Updated'}));
    }
    )
}

async function deleteProduct({params:{id}},res){
    db.run('DELETE FROM products WHERE id=?', [id],
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
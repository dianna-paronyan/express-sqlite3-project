const {authenticateToken} = require("../jwt/jwt_authenticate")
function products_route(app){
    const products_controller = require('../controllers/products_controller')
    
    app.get('/products', products_controller.allProducts);
    app.post('/createProduct', authenticateToken, products_controller.createProduct);
    app.put('/updateProduct/:id', authenticateToken, products_controller.updateProduct);
    app.delete('/deleteProduct/:id', authenticateToken, products_controller.deleteProduct);
}

module.exports = {
    products_route
}
const {authenticateAdminToken} = require("../jwt/jwt_authenticate")
function products_route(app){
    const products_controller = require('../controllers/products_controller')
    
    app.get('/products', products_controller.allProducts);
    app.post('/createProduct', authenticateAdminToken, products_controller.createProduct);
    app.put('/updateProduct/:id', authenticateAdminToken, products_controller.updateProduct);
    app.delete('/deleteProduct/:id', authenticateAdminToken, products_controller.deleteProduct);
}

module.exports = {
    products_route
}
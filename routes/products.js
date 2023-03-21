
function products_route(app){
    const {adminAuthorization} = require("../jwt/jwt_authenticate");
    const products_controller = require('../controllers/products_controller');
    
    app.get('/products', products_controller.allProducts);
    app.post('/createProduct', adminAuthorization, products_controller.createProduct);
    app.put('/updateProduct/:id', adminAuthorization, products_controller.updateProduct);
    app.delete('/deleteProduct/:id', adminAuthorization, products_controller.deleteProduct);
}

module.exports = {
    products_route
}
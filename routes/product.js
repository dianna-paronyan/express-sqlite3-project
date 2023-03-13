function product_route(app){
    const product_controller = require('../controllers/product_controller')
    
    app.get('/products/:id', product_controller.singleProduct);
}

module.exports = {
    product_route
}
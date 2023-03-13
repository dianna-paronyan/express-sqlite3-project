function cart_route(app){
    const cart_controller = require('../controllers/')
    
    app.get('/cart', cart_controller);
}

module.exports = {
    cart_route
}
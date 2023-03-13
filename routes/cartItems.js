function cartItems_route(app){
    const cartItems_controller = require('../controllers/')
    
    app.get('/cartItems', cartItems_controller);
}

module.exports = {
    cartItems_route
}
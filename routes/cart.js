const { authenticateUserToken } = require('../jwt/jwt_authenticate');
function cart_route(app){
    const cart_controller = require('../controllers/cart_controller')
    
    app.get('/cartUser',authenticateUserToken,  cart_controller.userCart)
    app.post('/cart', cart_controller.cart);
}

module.exports = {
    cart_route
}
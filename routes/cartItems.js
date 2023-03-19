const { authenticateUserToken } = require('../jwt/jwt_authenticate');

function cartItems_route(app){
    const cartItems_controller = require('../controllers/cartItems_controller');

    app.get('/allCartItems', authenticateUserToken, cartItems_controller.allCartItems);
    app.get('/cartItem', authenticateUserToken, cartItems_controller.cartItem);
    app.post('/createCartItems', authenticateUserToken, cartItems_controller.createCartItems);
    app.put('/updateCartItems/:id', authenticateUserToken, cartItems_controller.updateCartItems);
    app.delete('/deleteCartItems/:id', authenticateUserToken, cartItems_controller.deleteCartItems);
}

module.exports = {
    cartItems_route
}
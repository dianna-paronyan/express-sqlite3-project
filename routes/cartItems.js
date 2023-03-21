
function cartItems_route(app){
    const { authenticateUserToken, authenticateAdminToken } = require('../jwt/jwt_authenticate');
    const cartItems_controller = require('../controllers/cartItems_controller');

    app.get('/allCartItems', authenticateAdminToken, cartItems_controller.allCartItems);
    app.get('/cartItem', authenticateUserToken, cartItems_controller.cartItem);
    app.post('/createCartItems', authenticateUserToken, cartItems_controller.createCartItems);
    app.put('/updateCartItems', authenticateUserToken, cartItems_controller.updateCartItems);
    app.delete('/deleteCartItems/:id', authenticateUserToken, cartItems_controller.deleteCartItems);
}

module.exports = {
    cartItems_route
}
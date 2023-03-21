
function cartItems_route(app){
    const { userAuthorization, adminAuthorization } = require('../jwt/jwt_authenticate');
    const cartItems_controller = require('../controllers/cartItems_controller');

    app.get('/allCartItems', adminAuthorization, cartItems_controller.allCartItems);
    app.get('/cartItem', userAuthorization, cartItems_controller.cartItem);
    app.post('/createCartItems', userAuthorization, cartItems_controller.createCartItems);
    app.put('/updateCartItems', userAuthorization, cartItems_controller.updateCartItems);
    app.delete('/deleteCartItems/:id', userAuthorization, cartItems_controller.deleteCartItems);
}

module.exports = {
    cartItems_route
}
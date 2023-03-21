function cart_route(app) {
  const { authenticateUserToken } = require("../jwt/jwt_authenticate");
  const cart_controller = require("../controllers/cart_controller");

  app.get("/cartUser", authenticateUserToken, cart_controller.userCart);
  app.post("/createCart", authenticateUserToken, cart_controller.cart);
}

module.exports = {
  cart_route,
};

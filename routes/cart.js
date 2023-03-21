function cart_route(app) {
  const { userAuthorization } = require("../jwt/jwt_authenticate");
  const cart_controller = require("../controllers/cart_controller");

  app.get("/cartUser", userAuthorization, cart_controller.userCart);
  app.post("/createCart", userAuthorization, cart_controller.cart);
}

module.exports = {
  cart_route,
};

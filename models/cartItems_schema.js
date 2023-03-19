function cartItemsTable(db){
    db.run(
        "CREATE TABLE IF NOT EXISTS cartItems(id INTEGER PRIMARY KEY, cart_id INTEGER NOT NULL, product_id INTEGER NOT NULL, FOREIGN KEY (cart_id) REFERENCES cart(id), FOREIGN KEY (product_id) REFERENCES products(id))"
      );
}
module.exports = {cartItemsTable}
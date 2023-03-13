function cartTable(db){
    db.run(
        "CREATE TABLE IF NOT EXISTS cart(id INTEGER PRIMARY KEY, user_id INTEGER NOT NULL,FOREIGN KEY (user_id) REFERENCES users(id))"
      );
}
module.exports = {cartTable}
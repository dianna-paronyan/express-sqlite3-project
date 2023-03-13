
function productsTable(db){
    db.run('CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY, image TEXT, name TEXT, price INTEGER, description TEXT,quantity INTEGER)')
}

module.exports = {
    productsTable
}
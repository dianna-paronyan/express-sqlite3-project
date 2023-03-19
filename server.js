const express = require('express');
const app = express();
const port = require('./constants').port;
const db = require('./index').db;
const { cartItemsTable } = require('./models/cartItems_schema');
const { usersTable } = require('./models/users_schema');
const { cart_route } = require('./routes/cart');
const { cartItems_route } = require('./routes/cartItems');
const { product_route } = require('./routes/product');
const {products_route} = require('./routes/products');
const { users_route } = require('./routes/users');
const {cartTable} = require('./models/cart_schema')
const {productsTable} = require('./models/products_schema');
app.use(express.json());

productsTable(db);
usersTable(db);
cartTable(db);
cartItemsTable(db);

app.get('/', (req,res)=>{
    res.send('hello')
})

products_route(app);
product_route(app);
users_route(app);
cart_route(app);
cartItems_route(app);

app.listen(port);
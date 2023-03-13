const express = require('express');
const { usersTable } = require('./models/users_schema');
const { product_route } = require('./routes/product');
const app = express();
const {products_route} = require('./routes/products');
const { users_route } = require('./routes/users');
const port = require('./constants').port;
const db = require('./index').db;
const productsTable = require('./models/products_schema').productsTable;
app.use(express.json());

productsTable(db);
usersTable(db);

app.get('/', (req,res)=>{
    res.send('hello')
})

products_route(app);
product_route(app);
users_route(app);

app.listen(port);
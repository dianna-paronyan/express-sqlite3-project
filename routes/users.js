function users_route(app){
    const user_controller = require('../controllers/user_controller');
    
    app.post('/register', user_controller.register);
    app.post('/login', user_controller.login);
}

module.exports = {
    users_route
}
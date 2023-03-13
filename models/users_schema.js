
function usersTable(db){
    db.run('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, username TEXT, password TEXT, role INTEGER)')
}

module.exports = {usersTable}
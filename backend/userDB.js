const sqlite3 = require("sqlite3")

const userDB = new sqlite3.Database("userData.db")

userDB.serialize(() => {
    userDB.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        username TEXT, 
        password TEXT
        )`)
})

module.exports = userDB
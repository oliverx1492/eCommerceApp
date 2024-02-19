const sqlite3 = require("sqlite3")

const catalogDB = new sqlite3.Database("catalogData.db")

catalogDB.serialize( ()=> {
    catalogDB.run(`
        CREATE TABLE IF NOT EXISTS catalog (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            img TEXT,
            name TEXT,
            artist TEXT,
            price INTEGER
        )
    `)
} )

module.exports = catalogDB
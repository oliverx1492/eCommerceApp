const sqlite3 = require("sqlite3")

const profileDB = new sqlite3.Database("profileData.db")

profileDB.serialize( ()=> {
    profileDB.run(`
        CREATE TABLE IF NOT EXISTS profile (
            id INTEGER,
            first_name TEXT,
            last_name TEXT,
            address TEXT,
            country TEXT,
            email TEXT,
            phone_number INTEGER,
            payment_method TEXT,
            shopping_cart TEXT
            
        )
    `)
} )

module.exports = profileDB
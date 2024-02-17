const express = require("express")
const app = express()
const port = 5000
const cors = require("cors")
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken")

//Datenbank für Login
const userDB = require("./userDB")

//Datenbank für Onlineshop
const profileDB = require("./profileDB")


app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello Backend")
})

app.post("/signup", (req, res) => {
    console.log(req.body)

    let lastID
    userDB.get("SELECT * from users WHERE username = ?", [req.body.username], (err, user) => {

        //Fehler während der Abfrage
        if (err) {
            console.log("Error during call", err)
            return res.status(500).json({ message: "Internal Server Error" })
        }

        //Username existiert bereits
        if (user) {
            return res.status(401).json({ message: "Username already taken" })
        }

        userDB.run("INSERT INTO users (username, password) VALUES (?,?)",
            [req.body.username, req.body.password], (err) => {
                if (err) {
                    console.log("Error durinf DB INSERT")
                    return res.status(500).json({ message: "Internal Server Error" })
                }

                //Keine Errors, der User wurde erstellt
                res.json({ message: "USER CREATED" })

            })

        //Hier bekomm ich die ID vom eben erstellten Benutzer
        userDB.get("SELECT last_insert_rowid() AS lastID", (err, id) => {
            if (err) {
                console.log("Error during id call")
                return
            }

            lastID = id.lastID

            profileDB.run("INSERT INTO profile (id) VALUES (?)",
                [lastID], (err) => {
                    if (err) {
                        console.log("Error during creating profile DB")
                    }
                    console.log("ID erfolgreich hinzugefügt")
                })


        })





    })

})

app.post("/login", (req, res) => {
    console.log(req.body)

    userDB.get("SELECT * from users WHERE username = ?", [req.body.username], (err, user) => {
        // Bei fehler während DB Call
        if (err) {
            console.log("Error during call", err)
            return res.status(500).json({ message: "Internal Server Error" })
        }
        // Wenn der Username nicht gefunden wird
        if (!user) {
            return res.status(401).json({ message: "Unknown Username" })
        }

        if (user.password !== req.body.password) {
            return res.status(401).json({ message: "Wrong password. Try again" })
        }
        console.log(user.id)
        const userID = user.id
        //Token generieren, der eine stunde gültig ist
        const token = jwt.sign({ username: user.username }, 'secret_key', { expiresIn: '1h' })



        res.json({ token, userID })
    })
})

app.post("/profile", (req, res) => {


    const id = parseInt(req.body.id)



    profileDB.get("SELECT * FROM profile WHERE id = ?", [id], (err, profile) => {
        if (err) {
            console.log("Error during call", err)
            return res.status(500).json({ message: "Internal Server Error" })
        }

        console.log(profile)
        res.json(profile)
    })



})

app.post("/editProfile", (req, res) => {
    console.log("EDIT", req.body)

    profileDB.run(`UPDATE profile SET 
    first_name = ?,
    last_name = ?,
    address = ?,
    country = ?,
    email = ?,
    phone_number = ?,
    payment_method = ? WHERE id = ?  `, [
            req.body.first_name, req.body.last_name, req.body.address, req.body.country, req.body.email
            , req.body.phone_number, req.body.payment_method, req.body.id], (err) => {
                if (err) {
                    console.error('Fehler beim Aktualisieren des Profils:', err);
                    res.status(500).send('Interner Serverfehler');
                    return;
                }

                res.json({message: "Profil erfolgreich aktualisiert"})
            })




})

app.listen(port, () => {
    console.log(`Server listening at port http://localhost:${port}`)
})
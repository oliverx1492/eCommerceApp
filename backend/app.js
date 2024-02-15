const express = require("express")
const app = express()
const port = 5000
const userDB = require("./userDB")
const cors = require("cors")
const bodyParser = require('body-parser');


app.use(bodyParser.json())
app.use(cors())

app.get("/", (req,res)=> {
    res.send("Hello Backend")
})

app.post("/signup", (req,res)=> {
    console.log(req.body)

    userDB.get("SELECT * from users WHERE username = ?", [req.body.username], (err, user)=> {

        //Fehler während der Abfrage
        if(err) {
            console.log("Error during call", err)
            return res.status(500).json({message: "Internal Server Error"})
        }

        //Username existiert bereits
        if(user) {
            return res.status(401).json({ message: "Username already taken" })
        }

        userDB.run("INSERT INTO users (username, password) VALUES (?,?)",
        [req.body.username, req.body.password], (err)=> {
            if (err) {
                console.log("Error durinf DB INSERT")
                return res.status(500).json({message: "Internal Server Error"})
            }

            //Keine Errors, der User wurde erstellt
            res.json({message: "USER CREATED"})
        })
        
    })
    
})

app.post("/login", (req,res) => {
    console.log(req.body)

    userDB.get("SELECT * from users WHERE username = ?", [req.body.username], (err,user)=> {
        // Bei fehler während DB Call
        if(err) {
            console.log("Error during call", err)
            return res.status(500).json({message: "Internal Server Error"})
        }
        // Wenn der Username nicht gefunden wird
        if(!user) {
            return res.status(401).json({message: "Unknown Username"})
        }

        if(user.password !== req.body.password) {
            return res.status(401).json({message: "Wrong password. Try again"})
        }

        res.json({message: "Login successful"})
    })
})


app.listen(port, ()=> {
    console.log(`Server listening at port http://localhost:${port}`)
})
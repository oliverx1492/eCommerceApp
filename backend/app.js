const express = require("express")
const app = express()
const port = 5000
const cors = require("cors")
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken")
const path = require("path")

//Datenbank für Login
const userDB = require("./userDB")

//Datenbank für ProfilDaten
const profileDB = require("./profileDB")

//Datenbank für Catalog
const catalogDB = require("./catalogDB")

//Die statischen Files aus dem gebuildeten JS Frontend


app.use(express.static(path.join(__dirname, '../frontend/project/dist')));


app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello Backend")
})

app.post("/checkAdmin", (req,res)=> {
    
    const id = parseInt(req.body.id)
    

    userDB.get("SELECT * FROM users WHERE id = ?", [id], (err, user)=> {
      
        if(err) {
            console.log(err)
            return res.status(500).json({message: "Internal Server Error"})
        }

        if(user) {
            
            return res.json({isAdmin: user.isAdmin})
        } else {
            console.log("User not found"); // Protokolliere, wenn kein Benutzer gefunden wurde
        }
        
        
    })


})


app.post("/addCatalog", (req,res)=> {
    console.log(req.body)

    catalogDB.run("INSERT INTO catalog (img, name, artist, price) VALUES (?,?,?,?) ", 
    [req.body.img, req.body.name, req.body.artist, req.body.price], (err)=> {
        if(err) {
            console.log(err)
            return res.status(500).json({message: "Internal Server Error"})
        }

        res.json({message: "Picture added"})
    })

})

app.get("/getCatalog", (req,res)=> {

    catalogDB.all("SELECT * from catalog", (err,row)=> {
        if(err) {
            console.log(err)
            return res.status(500).json({message: "Internal Server Error"})
        }

        console.log(row)
        res.json(row)
        
    })

    
})



app.post("/getProduct", (req,res) => {
    console.log(req.body.id)
    const id = parseInt(req.body.id)

    catalogDB.get("SELECT * from catalog WHERE id = ?", [id], (err,row)=> {
        if(err) {
            console.log(err)
            return res.status(500).json({message: "Internal Server Error"})
        }

        if(row) {
            
            res.json(row)
        }
    })

})

const setAdmin = () => {
    const username = "admin"
    const password = "admin"
    const isAdmin = true

    userDB.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
        if (err) {
            console.log(err)
        }

        if (user) {
            console.log(user)
        }

        userDB.run("INSERT INTO users (username, password, isAdmin) VALUES (?,?,?)",
            [username, password, isAdmin], (err) => {
                if (err) {
                    console.log(err)
                }
            })
    })

}
// funktion is auskommentriert weil sie schon exekutiert wurde
//setAdmin()
//admin braucht auch kein profileDB eintrag


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

            res.json({ message: "Profil erfolgreich aktualisiert" })
        })




})

app.post("/addCart", (req,res) => {
    console.log(req.body)
    const id = req.body.profileInfo.id

    profileDB.get("SELECT shopping_cart FROM profile WHERE id = ?", [id], (err, row)=> {
        if(err) {
            res.status(500).json({message: "Internal Server Error"})
        }
        
        console.log(row)

        //Falls daten in shopping cart vorhanden sind werden sie hier reingeparst
        let shoppingCartArray = []
        if (row && row.shopping_cart) {
            shoppingCartArray = JSON.parse(row.shopping_cart)
        }

        shoppingCartArray.push(req.body.product)
        console.log("ARRAY: ", shoppingCartArray)

        profileDB.run("UPDATE profile SET shopping_cart = ? WHERE id = ?", 
        [JSON.stringify(shoppingCartArray), id],
        (err)=> {
            if(err) {
                res.status(500).json({message: "Internal Server Error run"})
            }

            res.json({message: "Updated succesfully"})
        })

    })

})

app.post("/deleteCart", (req,res) => {
    console.log(req.body)
    //id = proctID, profileID ist profileID
    const profile_id = req.body.profileID 
    const productID = req.body.id

    profileDB.get("SELECT shopping_cart FROM profile WHERE id = ?", [profile_id], (err, row)=> {
        if(err) {
            res.status(500).json({message: "Internal Server Error"})
        }

        let shoppingCartArray = []
        shoppingCartArray = JSON.parse(row.shopping_cart)
        console.log(shoppingCartArray)
        const deletedCart = shoppingCartArray.filter(item => item.id !== productID)
        console.log(deletedCart)


        profileDB.run("UPDATE profile SET shopping_cart = ? WHERE id = ?", 
        [JSON.stringify(deletedCart), profile_id], (err)=> {
            if(err) {
                res.status(500).json({message: "Internal Server Error"})
            }

            res.json({message: "Successfully deleted"})
        })

    })

})

app.post("/deleteWholeCart", (req,res) => {
    profileDB.run("UPDATE profile SET shopping_cart = NULL WHERE id = ?", [req.body.id], (err)=> {
        if (err) {
            
            res.status(500).json({message: "Internal Server Error"});
        } else {
            
            res.status(200).json({message: "erfolgreich gelöscht"});
        }
    })
   
    

})

app.post("/search", (req,res)=> {
    console.log(req.body)

    catalogDB.all("SELECT * FROM catalog WHERE artist LIKE '%' || ? || '%' OR name LIKE '%' || ? || '%'", 
    [req.body.search, req.body.search], (err,rows)=> {
        if(err) {
            console.log(err)
            return res.status(500).json({message: "Internal Server Error"})
        }

        if (rows.length > 0) {
            console.log(rows);
            return res.json(rows); // Send the found rows as JSON response
        } else {
            return res.status(500).json({ message: "Nothing found" });
        }
    })

})

app.get("/artists", (req,res)=> {

    catalogDB.all("SELECT artist FROM catalog", (err, row) => {
        if(err) {
            console.log(err)
        }

        if(row) {
            console.log(row)
            res.json({artists: row})
        }
    })
})

app.listen(port, () => {
    console.log(`Server listening at port http://localhost:${port}`)
})
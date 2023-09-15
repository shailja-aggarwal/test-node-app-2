const express = require("express");
const app = express();
const bcrypt = require("bcrypt")

app.use(express.json())

const users = []

app.get("/users", (req, res) => {
    res.json(users)
})

app.post("/users", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)  //create a salt hence everytinme encryption key is unique
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log("salt", salt)
        console.log("hashedPassword", hashedPassword)
        const user= {"name": req.body.name, "password": hashedPassword}
        users.push(user) 
        res.status(201).send(users)
    } catch (error) {
        res.status(500).send()
    }


})

app.post("/users/login", async(req, res) => {
    const user = users.find((e) => e.name == req.body.username)
    if(user){
        try {
            const isValid = await bcrypt.compare(req.body.password, user.password)
            if(isValid){
                res.status(200).send("Success")
            } else {
                res.status(200).send("Invalid")
            }

        } catch (error) {
            res.status(500).send('Error')
        }

    } else {
        res.status(500).send('cannot find the user')
    }
})

app.listen(3000)
require("dotenv").config()
const express = require("express")
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json())

const posts = [{"name":"post1", "title": "title1"}, {"name":"post", "title": "title2"}]

app.get("/posts", authenticateToken, (req, res) => {
    res.json(posts.filter((e) => e.name == req.user.name))
})


function authenticateToken(req, res, next){
  const authHeader = req.headers['authorization'];
  console.log("authHeader",authHeader )
  const token = authHeader && authHeader.split(' ')[1];
  console.log("token ",token )
  if(token == null){
    return res.sendStatus(401)
  }
  jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (err, user) => {
    if(err){
        res.sendStatus(403)
    } else {
        req.user = user;
        next()
    }
  })

}

app.listen(3000)
require("dotenv").config()
const express = require("express")
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json())

let refreshTokens = []

// const posts = [{"name":"post1", "title": "title1"}, {"name":"post", "title": "title2"}]

// app.get("/posts", authenticateToken, (req, res) => {
//     res.json(posts.filter((e) => e.name == req.user.name))
// })

app.post('/token', (req,res) => {
    const refreshToken = req.body.token
    if(refreshToken == null) res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken)){
       res.sendStatusCode(403)
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
        if(err){
            return res.statusCode(403)
        } else {
            const accessToken = generateAccesToken({name:user.name});
            res.json({accessToken: accessToken})
        }
    })

})

app.post('/login', (req, res) => {
    //authentication
    const username = req.body.username
    const user = {name: username}
    const accessToken = generateAccesToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({accessToken: accessToken, refreshToken: refreshToken})
})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token != req.body.token);
    res.sendStatus(204)
})

// function authenticateToken(req, res, next){
//   const authHeader = req.headers['authorization'];
//   console.log("authHeader",authHeader )
//   const token = authHeader && authHeader.split(' ')[1];
//   console.log("token ",token )
//   if(token == null){
//     return res.sendStatus(401)
//   }
//   jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (err, user) => {
//     if(err){
//         res.sendStatus(403)
//     } else {
//         req.user = user;
//         next()
//     }
//   })

// }

function generateAccesToken(user){
    return jwt.sign(user, process.env.ACESS_TOKEN_SECRET, {expiresIn: '15s'});

}

app.listen(4000)
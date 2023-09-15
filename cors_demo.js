const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
    origin:"http://localhost:5500",  //if we add tthe client url here cors error will stop or this particular origin is allowed
    methods: ["GET", "POST"],
    credentials: true // to send cookie
}));
// we can add methods here we want to allow

app.get('/', (req, res) => {
    res.json({"data": "Secret Data"})
})

app.listen(3000)
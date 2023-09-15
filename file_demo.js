const { log } = require("console");
const express = require("express");
const app = express();
const fs = require("fs");

// sync call
fs.writeFileSync('./test.txt', 'Hello world') //will cerate a file with name text.txt with text het their // will block until file read

// async call
fs.writeFile('./test2.txt', 'Hello from async', (err) => {

}) // will not block the code

const result = fs.readFileSync('./test4.txt', "utf-8")
console.log("result", result)

fs.readFile('./test4.txt', (err, res) => {
    if(err){
        console.log(err)
    } else {
        console.log(result)
    }
})

const appendedResult = fs.appendFileSync('./test.txt', "Hello new date is fcvgbh");
console.log("appendedResult"),appendedResult

fs.appendFile("./test2.txt", "Hello from file2", (err, res) => {
    if(err){
        console.log(err)
    } else {
        console.log(res)
    }
})

// fs.cpSync("./test.txt", "")


app.listen(3000)
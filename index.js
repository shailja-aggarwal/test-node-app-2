const express = require('express');
const {fork} = require('child_process');

const app = express();

app.get('/one', (req, res) => {
    const sum = longComputation();
     res.send(sum)
})

app.get('/two', async (req, res) => {
    const sum = await longComputation();
    res.send(sum)
})

app.get('/three', (req, res) => {
    const child = fork('./longtask.js');
    child.send('start');
    child.on('message', (sum) => {
        res.send(sum)
    })
})

app.listen(3000, ()=> {
    console.log("Server on port 3000")
})

function longComputation(){
    let sum =0;
    for(let i=0; i<100000000; i++){
       sum = sum + i;
    }
    return sum
}

function longCompute(){
    return new Promise((resolve, reject) => {
        let sum =0;
        for(let i=0; i<100000000; i++){
           sum = sum + i;
        }
        resolve(sum)
    })
}
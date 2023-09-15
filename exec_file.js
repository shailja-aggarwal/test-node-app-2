const {execFile} = require('child_process');

execFile('ls - lh', (error, stdout, stderr) => {
    if(error){
        console.log(error)
        return
    } 
    if(stderr) {
        console.log(stderr)
        return
    }

    console.log(stdout)
})
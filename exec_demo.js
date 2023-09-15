const {exec} = require('child_process');

exec('ls - lh', (error, stdout, stderr) => {
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
const {spawn} = require('child_process');

const child = spawn('ls', ['-lh'])

child.stdout.on('data', () => {
    console.log(data)
})

child.stderr.on('data', () => {
    console.log(data)
})

child.on('err', () => {
    console.log(data)
})

child.on('exit', (code, signal) => {
    console.log(data)
})
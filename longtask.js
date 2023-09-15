function longComputation(){
    let sum =0;
    for(let i=0; i<100000000; i++){
       sum = sum + i;
    }
    return sum
}

process.on('message', (messgae) => {
    if(messgae == 'start'){
        const sum = longComputation();
        process.send(sum)
    }

}) 
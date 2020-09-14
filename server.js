// var http =require('http');

// http.createServer(function(request, response){

//     response.writeHead(200, {'Content-Type': 'text/plain'});
//     response.end('hello world!\n');
// }).listen(8888);

// function foo1(){
//     var fs = require('fs');
//     var data = fs.readFileSync('1.txt');
//     console.log(data.toString());
//     console.log('done');

//     fs.readFile('a.txt', function(error, data){
//         if (err) return console.error(err);
//         console.log(data.toString());
//     });
//     console.log('done');
// }

var events = require('events');

var eventEmitter = new events.EventEmitter();

var connectHandler = function connected(){
    console.log('connect successfully.');
    eventEmitter.emit('data_received');
}

eventEmitter.on('connection', connectHandler);
eventEmitter.on('data_received', function(){
console.log('received successfully.');
});

setTimeout(() => {
    eventEmitter.emit('connection');
    console.log('execution done.')
}, 2000);
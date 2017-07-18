const http = require('http');
const WSServer = require('socket.io');
const fs = require('fs');

const server = http.createServer(handler).listen(8888);
const io = new WSServer(server,{
    path: '/socket.io',
    serveClient: true
});

io.on('connect', socket => console.log('New connection: ' + socket.id));

io.of('/ctakes').on('connect', socket => {
        socket.on('message', text => {
            console.log('New parsing job: ' + text);
            socket.emit('finished', fs.readFileSync('example.xml','utf8'));//THIS IS WHERE CTAKES WILL PLUG IN
        });
})

function handler(req, res) {
    res.end(fs.readFileSync('index.html','utf8'));
}
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var messages = [
    {
        id: 1,
        message: "Hola amiguitos, como están?",
        author: "David",
        date: new Date()
    }
];
app.use(express.static('public'));
app.get('/', function(req, res){
    res.send("Esta corriendo este pinche servidor").status(200);
});
io.on('connection', function(socket){
    console.log("Alguien se conectó");
    socket.emit('messages', messages);
    socket.on('new-message', function(data){
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
    socket.on('writting', function(data){
        console.log("alguien escribe...");
        io.sockets.emit('escribiendo', data);
    });
    socket.on('stop', function(data){
        console.log("paro de escribir...");
        io.sockets.emit('paro', data);
    });
});
server.listen('8000', function(){
    console.log("Server corriendo en el puerto 8000")
});

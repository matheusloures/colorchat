var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const { colorxjs } = require('colorxjs');
var adj = require('./words.json')
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

io.on('connection', function(socket){
    var intervalo = interval(3000);
      colorxjs.intervalo(3000, adj.length).subscribe(tempo=>{
        io.emit('chat message', adj[tempo]['word_en']);
      })
    
  });

  io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });
    
  });

http.listen(3000, function(){
  console.log('listening on *:3000');
});
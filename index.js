const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('chat message', (msg) => {
    console.log(`Received message: ${msg}`);
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('Signaling server running on http://localhost:3000');
});
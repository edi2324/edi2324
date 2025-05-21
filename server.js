const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', socket => {
  console.log('User connected');

  socket.on('send-message', data => {
    socket.broadcast.emit('receive-message', data);
  });

  socket.on('call-user', data => {
    socket.to(data.to).emit('call-made', {
      offer: data.offer,
      socket: socket.id
    });
  });

  socket.on('make-answer', data => {
    socket.to(data.to).emit('answer-made', {
      answer: data.answer,
      socket: socket.id
    });
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

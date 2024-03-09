const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const path = require('path');
let visitorCount = 0;

io.on('connection', (socket) => {
  visitorCount++;
  console.log('A visitor connected. Current count:', visitorCount);
  io.emit('visitorCount', visitorCount);

  socket.on('disconnect', () => {
    visitorCount--;
    console.log('A visitor disconnected. Current count:', visitorCount);
    io.emit('visitorCount', visitorCount);
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static(path.join(__dirname, 'public')));
server.listen(3000, () => {
  console.log('listening on *:3000');
});

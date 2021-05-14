const express = require('express');
const app = express();

// required for socket.io
const http = require('http');
// const server = http.createServer(app);

// middleware package to enable cross-origin requests
const cors = require('cors');
const path = require('path');

// socket.io library establishes a connection between two devices via WebSocksets

app.use(cors());

// Static Files
app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

// this gives us a personal id on the front-end

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`app is listening at port ${port}!`);
});

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  // emits event to all connected sockets
  console.log('connected');
  socket.emit('me', socket.id);
  // sends message to everyone except for emitting socket
  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded');
  });
  socket.on('callUser', ({ callee, signalData, from, name }) => {
    io.to(callee).emit('callUser', { signal: signalData, from, name });
  });
  socket.on('answerCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });
});

module.exports = io;

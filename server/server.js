const express = require('express');
const app = express();

// middleware package to enable cross-origin requests
const cors = require('cors');
const path = require('path');

app.use(cors());

// Static Files
app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`app is listening at port ${port}!`);
});

// socket.io library establishes a connection between two devices via WebSocksets
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.emit('me', socket.id);

  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded');
  });

  socket.on('callUser', ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit('callUser', { signal: signalData, from, name });
  });

  socket.on('answerCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });
});

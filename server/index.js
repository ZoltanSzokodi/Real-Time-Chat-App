const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const {
  addUser,
  removeUser,
  getUser,
  getUserInRoom
} = require('./users.js');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
  socket.on('join', ({ name, room }, callback) => {
    // addUser returns either an error msg or the user obj
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);
  });

  socket.on('disconnect', () => {
    console.log('User has left')
  })
});

app.use(router);

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
const { formatMessage, addUser, removeUser, getCurrentRoomUsers, getActiveUserInfo } = require('./src/helper');

const httpServer = require('http').createServer();

// Create Socke IO Channel
const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => { 
  console.log(`Client with socket id: ${socket.id} connected`);

  // On joining room, should execute clients callback received in the payload
  socket.on('joinRoom', ({userName, room}, callback) => { 
    socket.join(room);
    // addUser(room, socket.id)
    callback(true)
    addUser(socket.id, userName, room);
    io.to(room).emit('userList', {
      room,
      users: getCurrentRoomUsers(room)
    })
    socket.emit('message', formatMessage('Admin', 'Welcome to Chatter Patter! Messages are limited to this chat room.'));
    socket.broadcast.to(room).emit('message', formatMessage('Admin', `${userName} has joined the chat`));
  })

  socket.on('chatMessage', (newMessage) => {
    const user = getActiveUserInfo(socket.id)
    if(!user.room || !user.userName) return
    io.to(user.room).emit('message', formatMessage(user.userName, newMessage));
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if(!user) return

    io.to(user.room).emit('message', formatMessage('Admin', `${user.userName} has left the room.`))
    io.to(user.room).emit('userList', {
      room: user.room,
      users: getCurrentRoomUsers(user.room)
    })
  })
  socket.on('disconnecting', (reason) => {
    console.log(`Socket with id : ${socket.id} has been disconnected. Reason for disconnecting: ${reason}`);
    const user = removeUser(socket.id)
    if(!user) return
    io.to(user.room).emit('message', formatMessage('Admin', `${user.userName} has left the room.`))
    io.to(user.room).emit('userList', {
      room: user.room,
      users: getCurrentRoomUsers(user.room)
    })
  })



})




// Start the server
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`WS Listening on ${PORT}`);
})
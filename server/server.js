const { formatMessage } = require('./src/helper');

const httpServer = require('http').createServer();

// Create Socke IO Channel
const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://127.0.0.1:5173'
  }
});

io.on('connection', (socket) => { 
  console.log(`Client with socket id: ${socket.id} connected`);

  // On joining room, should execute clients callback received in the payload
  socket.on('joinRoom', ({room}, callback) => { 
    socket.join(room);
    // addUser(room, socket.id)
    callback(true)
  })

  socket.on('leaveRoom', ({ room }, callback) => {
    socket.leave(room)
    // removeUser(room, socket.id)
    callback(true)
  })

  socket.on('disconnecting', (reason) => {
    console.log(`Socket with id : ${socket.id} has been disconnected. Reason for disconnecting: ${reason}`);
  })

  socket.emit('message', formatMessage('Admin', 'Welcome to Chatter Patter! Messages are limited to this chat room.'));
})




// Start the server
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`WS Listening on ${PORT}`);
})
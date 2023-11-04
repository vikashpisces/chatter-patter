import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

socket.on('connect', () => {
  console.log('You are connected with an id: ', socket.id);
});

socket.on('disconnect', () => {
  console.log(`Socket id: ${socket.id} has been disconnected`);
});

export default socket;

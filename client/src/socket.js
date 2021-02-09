const io = require('socket.io-client');

const socket = io.connect(window.location.origin);

socket.on('connect', () => {
  console.log('Connected!', `${socket.id}`);
});

socket.on('disconnect', () => {
  console.log('Disconnected!');
});

export default socket;

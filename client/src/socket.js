const io = require('socket.io-client');
const socket = io.connect(window.location.origin);
// const socket = io.connect('http://localhost:5000');

socket.on('connect', () => {
  console.log('Connected!', `${socket.id}`);
});

socket.on('disconnect', () => {
  console.log('Disconnected!');
});

export default socket;

const io = require('socket.io-client');
const isProductionMode = process.env.Node_ENV === 'production';
const socket = io.connect(isProductionMode ? window.location.origin : 'http://localhost:5000');

socket.on('connect', () => {
  console.log('Connected!', `${socket.id}`);
});

socket.on('disconnect', () => {
  console.log('Disconnected!');
});

export default socket;

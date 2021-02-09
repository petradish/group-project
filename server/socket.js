module.exports = io => {
    io.on('connection', (socket) => {
      socket.on('joinRoom', function(room) {
        console.log('Connected to Room:', room);
        socket.join(room);
      });

      socket.on('select-topic', () => {
        socket.broadcast.emit('topic');
      });

      socket.on('leaveRoom', function(room) {
        console.log('Leaving Room:', room);
        socket.leave(room);
      });

      socket.on('disconnect', () => {
        console.log(`Connection ${socket.id} has left the building`);
      });
    })
}
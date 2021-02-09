module.exports = io => {
    io.on('connection', socket => {
      console.log(
        `A socket connection to the server has been made: ${socket.id}`
      );
      
      socket.on('select-topic', (data) => {
        socket.broadcast.emit('select-topic', data);
        console.log('someone selected a topic')
      });

      socket.on('disconnect', () => {
        console.log(`Connection ${socket.id} has left the building`);
      });
    })
  }
module.exports = io => {
    io.on('connection', socket => {
      console.log(
        `A socket connection to the server has been made: ${socket.id}`
      );
      
      socket.on('select-project', (data) => {
        socket.broadcast.emit('select-project', data);
        console.log('someone selected a project')
      });

      socket.on('disconnect', () => {
        console.log(`Connection ${socket.id} has left the building`);
      });
    })
  }
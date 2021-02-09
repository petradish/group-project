module.exports = io => {
    io.on('connection', (socket) => {
      socket.on('joinProject', function(project) {
        console.log('Connected to Project:', project);
        socket.join(project);
      });

      socket.on('select-topic', () => {
        socket.broadcast.emit('topic');
      });

      socket.on('leaveProject', function(project) {
        console.log('Leaving Project:', project);
        socket.leave(project);
      });
    })
}
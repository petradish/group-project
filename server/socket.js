module.exports = io => {
    io.on('connection', (socket) => {
        socket.on('joinProject', function (project) {
            console.log('Connected to Project:', project);
            socket.join(project);
        });

        socket.on('select-topic', ({projectId}) => {
            socket.broadcast.emit('topic', projectId);
        });

        socket.on('leaveProject', function (project) {
            console.log('Leaving Project:', project);
            socket.leave(project);
        });
    })
}
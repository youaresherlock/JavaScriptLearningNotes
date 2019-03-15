var app = require('http').createServer();
// new Server(httpServer[,options]) httpServer: the server to bind to.
var io = require('socket.io')(app); 

app.listen(3000);
// io.on('connection', function(socket)) 监听客户端连接，回调函数会传递本次连接的socket
io.on('connection', function(socket){
    // socket.emit(eventName[, ...args][, ack]) 给该socket的客户端发送消息
    socket.emit('news', {hello : 'world'});

    // socket.on(eventName, callback) Register a new handler for the given event.
    // 监听客户端发送的消息
    socket.on('my other event', function(data) {
        console.log(data);
    })
});


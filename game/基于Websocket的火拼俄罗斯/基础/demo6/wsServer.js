var app = require("http").createServer();
var io = require('socket.io')(app);

const hostname = '193.112.48.106';
const port = 3000;

app.listen(port);

// 客户端计数器
var clientCount = 0;

io.on('connection', function(socket) {
    clientCount ++;
    socket.nickname = 'user' + clientCount;
    // namespace.emit(eventName [, ...args]) 向所有连接的客户端发出事件
    io.emit('enter', socket.nickname + ' comes in');

    socket.on('message', function(str) {
        io.emit('mes', socket.nickname + ' says: ' + str);
    });
    
    // disconnect为默认断开连接事件
    socket.on('disconnect', function(){
        io.emit('leave', socket.nickname + ' left');
    });
});

console.log("websocket server listening on port: " + port + ", on hostname: " + hostname);
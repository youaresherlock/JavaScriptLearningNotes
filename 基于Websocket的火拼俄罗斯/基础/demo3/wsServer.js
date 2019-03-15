var ws = require("nodejs-websocket");

const hostname = '193.112.48.106';
const port = 8001;

// 客户端计数器
var clientCount = 0;

// Scream server example : "hi" -> "HI!!!"
// 创建一个server对象, ws是引入nodejs-websocket后的主要对象
var server = ws.createServer(function(conn) {
    console.log("New connection");
    clientCount++;
    conn.nickname = 'user' + clientCount; 
    broadcast(conn.nickname + " comes in");

    // 收到文本时触发,str是收到的文本字符串
    conn.on("text", function(str) {
        console.log("Received" + str);
        broadcast(str);
    });
    // 连接关闭时触发
    conn.on("close", function(code, reason) {
        console.log("Connection closed");
        broadcast(conn.nickname + ' left');
    });
    // 发生错误时触发，如果握手无效，也会发出响应
    conn.on("error", function(err) {
        console.log("handle err");
        console.log(err);
    });
}).listen(port);

console.log("websocket server listening on port: " + port + ", on hostname: " + hostname);

// server.connections返回包含所有connection的数组，可以用来广播所有消息
// 服务端广播
function broadcast(msg) {
    server.connections.forEach(function(conn) {
        conn.sendText(msg);
    });
}
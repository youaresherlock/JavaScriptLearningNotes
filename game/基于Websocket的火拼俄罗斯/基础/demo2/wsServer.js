var ws = require("nodejs-websocket");

const hostname = '193.112.48.106';
const port = 8001;

// Scream server example : "hi" -> "HI!!!"
var server = ws.createServer(function(conn) {
    conn.on("text", function(str) {
        console.log("Received" + str);
        conn.sendText(str.toUpperCase() + "!!!");
    });
    conn.on("close", function(code, reason) {
        console.log("Connection closed");
    });
    conn.on("error", function(err) {
        console.log("handle err");
        console.log(err);
    });
}).listen(port);

console.log("websocket server listening on port: " + port + ", on hostname: " + hostname);
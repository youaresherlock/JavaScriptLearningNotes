//我们可以使用函数传递
var http = require("http");

function onRequest(request, response) {
	response.writeHead(200, {"Content-Type" : "text/plain"});
	response.write("Hello World");
	response.end();
}

http.createServer(onRequest).listen(8888);


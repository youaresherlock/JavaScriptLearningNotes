var app = require('http').createServer();

http.createServer(function(request, response){
		// 发送http请求
		// HTTP状态值: 200 : OK
		// 内容类型: text/plain
		response.writeHead(200, {'Content-Type': 'text/plain'});
		
		// 发送相应数据 "Hello World"
		response.end("Hello World\n");
}).listen(8888);

//终端打印如下信息
console.log("server running at http:// 127.0.0.1:8888/");


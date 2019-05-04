//引入express模块并在客户端发起请求后,响应"Hello World"字符串
var express = require("express");
var app = express();

app.get('/',  function(req, res) {
	res.send("Hello World");
});

var server = app.listen(8080, function() {
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("应用实例, 访问地址为http://%s:%s", host, port);
});

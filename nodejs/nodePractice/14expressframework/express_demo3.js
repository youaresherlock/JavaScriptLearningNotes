//静态文件
//Express提供了内置的中间件express.static来设置静态文件如: images, css, js等
//可以使用express.static中间件来设置静态文件路径.如果将图片等资源放在public目录下,可以这样写
//app.use('/public', express.static('public'));
//expresss.(root,[options]) root指出提供静态资源的目录
var express = require("express");
var app = express();

//app.use('/public', express.static('public')); 第一个路径参数是虚拟路径,第二个参数是实际要开放的路径
app.use(express.static('.'));//可以访问当前目录下的所有静态文件;
app.get('/', function(req, res) {
	res.send("Hello World");
});

var server = app.listen(8080, function() {
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("应用实例, 访问地址为http://%s:%s", host, port);
})

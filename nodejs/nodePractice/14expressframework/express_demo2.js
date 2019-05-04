//路由决定了由谁(指定脚本)去响应客户端请求
//在HTTP请求中,我们可以通过路由提取出请求的URL以及GET/POST参数
var express = require("express");
var app = express();

//主页输出"Hello World"
app.get("/", function(req, res) {
	console.log("主页GET请求");
	res.send("Hello GET");
});

//POST请求
app.post("/", function(req, res) {
	console.log("主页POST请求");
	res.send("Hello POST");
});

// /del_user页面响应
app.get("/del_user", function(req, res) {
	console.log("/del_user 响应 DELETE 请求");
	res.send("删除页面");
});

app.get("/list_user", function(req, res) {
	console.log("/list_user GET请求");
	res.send("用户列表页面");
});

//对页面abcd, abxcd, ab123cd, 等响应GET请求
app.get("/ab*cd", function(req, res) {
	console.log("/ab*cd GET请求");
	res.send("正则匹配");
});

var server = app.listen(8080, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log("应用实例,访问地址为http://%s:%s", host, port);
});

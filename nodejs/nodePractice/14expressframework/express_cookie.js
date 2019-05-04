//Cookie管理
//可以使用中间件向Node.js服务器发送cookie信息
var express = require("express");
var cookieParser = require("cookie-parser");
var util = require("util");

var app = express();
app.use(cookieParser());

app.get("/", function(req, res) {
	res.cookie('cart', {items: [1, 2, 3]});
	res.end("Hello world");
	console.log("Cookies: " + util.inspect(req.cookies));
});

app.listen(8080);


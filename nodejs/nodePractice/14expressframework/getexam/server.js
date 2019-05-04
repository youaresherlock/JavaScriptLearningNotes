var express = require("express");
var app = express();
//body-parser中间件是node.js的消息体解析中间件，但是其不会解析multipart body,因为这种消息体很复杂而且也很大.
//可以解析json/raw/text body parser, url-encoded form body parser
//所有中间件都会把解析好的消息体封装到req.body上面如果没有消息体解析返回的是一个空对象{}
var bodyParser = require("body-parser");

//返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
//创建application/x-www-form-urlencoded编码解析
//var urlencodedParser = bodyParser.urlencoded({extended: false});

app.get("/index.html", function(req, res) {
	res.sendFile(__dirname + "/" + "index.html");
});


app.get("/process_get",  function(req, res) {
	//输出JSON格式
	var response = {
		"first_name" : req.query.first_name,
		"last_name":req.query.last_name
	};
	console.log(response, req.query);
	//如果表单get请求url中带有中文字符直接输出会乱码问题，需要设置响应内容编码方式 这里使用的是express的API也可以用node.jsAPI
	//res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});}
	res.set("Content-Type", "text/html; charset=utf-8");
	res.end(JSON.stringify(response));
});


var server = app.listen(8080, function() {
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("应用实例, 访问地址为http://%s:%s", host, port);
});	

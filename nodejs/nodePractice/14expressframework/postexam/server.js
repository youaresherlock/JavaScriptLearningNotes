var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.get("/index.html", function(req, res) {
	res.sendFile(__dirname + "/" + "index.html");
});

app.post("/process_post", urlencodedParser, function(req, res) {
	//输出JSON格式
	var response = {
		//req.body Contains key-value pairs of data submitted in the request body
		"first_name" : req.body.first_name,
		"last_name" : req.body.last_name
	};
	console.log(response);
	res.set("Content-Type", "text/html; charset=utf-8");
	res.end(JSON.stringify(response));
});

var server = app.listen(8080, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port);
});

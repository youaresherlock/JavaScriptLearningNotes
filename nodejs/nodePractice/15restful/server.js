var express = require("express");
var app = express();
var fs = require("fs");

//获取用户列表
app.get("/listUsers", function(req, res) {
	fs.readFile(__dirname + "/" + "users.json", "utf8", function(err, data) {
		console.log(data);
		res.set("Content-Type", "application/json; charset=utf-8");
		res.end(data);
	});
});

//添加新用户数据
var userMsg = {
	"user5" : {
		"name" : "mohit",
		"password" : "password5",
		"profession" : "teacher",
		"id": 5
	}
};

app.get("/addUser", function(req, res) {
	//读取已存在的数据
	fs.readFile(__dirname + "/users.json", "utf8", function(err, data) {
		var data = JSON.parse(data);
		data["user5"] = userMsg["user5"];
		console.log(data);
		//res.send(data);//会自动设置Content-Type
		res.set("Content-Type", "application/json; charset=utf-8");
		//Using a tab character mimics standard pretty-print appearance: 
		res.end(JSON.stringify(data, null, "\t")); //以上两行代码可以使用res.json(data),会自动设置Content-Type;
	});
});;

//删除用户，用户删除指定用户的详细信息
app.get("/deleteUser", function(req, res) {
	//First read existing users
	fs.readFile(__dirname + "/users.json", "utf8", function(err, data) {
		console.log(data);	
		data = JSON.parse(data);
		delete data["user" + 2];;
		res.set("Content-Type", "application/json; charset=utf-8");
		res.end(JSON.stringify(data, null, "\t"));
	});	
});

//查找指定id的用户 
//注: 如果在同一个 server.js 里创建多个 RESTful API ， 并且 :id 放在前边， 那么它会拦截其他的请求， 比如：
app.get("/:id", function(req, res) {
        //首先我们读取已经存在的用户
        fs.readFile(__dirname + "/users.json", "utf8", function(err, data) {
                var data = JSON.parse(data);
                var user = data["user" + req.params.id];
                if(!user) {
                        user = {status: 404, msg: "查询不到资源" };
                }
                console.log(user);
                res.set("Content-Type", "application/json; charset=utf-8");
                res.end(JSON.stringify(user, null, "\t"));
        });
});

var server = app.listen(8080, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log("应用实例，访问地址为 http://%s:%s", host, port);
});







































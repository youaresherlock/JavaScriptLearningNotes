//Mongodb中创建一个数据库,首先我们需要创建一个MongodClient对象，然后配置好指定的URL和端口号
//如果数据库不存在,mongodb将创建数据库并建立连接
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/runoob";

MongoClient.connect(url, {userNewUrlParser: true}, function(err, db) {
	if(err) throw err;
	console.log("数据库已创建!");
	db.close();
});


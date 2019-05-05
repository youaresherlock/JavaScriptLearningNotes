//连接数据库runoob的site表，并插入一条数据,使用insertOne()
var MongoClient =require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true}, function(err, db){
	if(err) throw err;
	var dbo = db.db("runoob");
	var myobj = {name: "Clarence", age: 25}
	dbo.collection("site").insertOne(myobj, function(err, res) {
		if(err) throw err;
		console.log("文档插入成功");
		db.close();
	});
});

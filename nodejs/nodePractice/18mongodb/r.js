//查询数据, find()可以返回所有匹配条件的所有数据,如果未指定条件,find()返回集合中的所有数据
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
	if(err) throw err;
	var dbo = db.db("runoob");
	dbo.collection("site").find({}).toArray(function(err, result) {
		if(err) throw err;
		console.log(result);
		db.close();
	});
});

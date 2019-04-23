//从流中读取
var fs = require("fs");
var data = '';

//创建可读流
var readerStream = fs.createReadStream("input.txt");

// 设置编码为utf8
readerStream.setEncoding("utf8");

//处理事件流 ->data, end, and error
readerStream.on("data", function(chunk) {
	data += chunk;
});

readerStream.on("end", function() {
	console.log(data);
});

readerStream.on("error", function(err) {
	console.log(err.stack);
});

console.log("程序执行完毕");

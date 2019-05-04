//异步模式下写入文件的语法格式
//fs.writeFile(file, data[, options], callback)
//writeFile直接打开文件默认是w模式,所以如果文件存在，该方法写入的内容会覆盖
//旧的文件内容.
//file- 文件名或文件描述符
//data- 要写入文件的数据，包含{encoding, mode, flag}
//callback- 回调函数，回调函数只包含错误信息参数err,在写入失败时返回
var fs = require("fs");

console.log("准备写入文件");
fs.writeFile("input.txt", "我是通过fs.writeFile写入文件的内容", function(err) {
	if(err) {
		return console.error(err);
	}
	console.log("数据写入成功");
	console.log("--------我是分割线-------------");
	console.log("读取写入的数据！");
	fs.readFile("input.txt", function(err, data) {
		if(err) {
			return console.error(err);
		}
		console.log("异步读取文件数据: " + data);
	});
});
	

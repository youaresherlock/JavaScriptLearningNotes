//打开文件的语法格式
//fs.open(path, flags[, mode], callback)

//path: 文件的路径  flags: 文件打开的行为 mode: 设置文件权限,默认0666(可读写)
//callback 回调函数带有两个参数 如: callback(err, fd)

var fs = require("fs");

//异步打开文件
console.log("准备打开文件!");
fs.open("input.txt", "r+", function(err, fd){
	if(err) {
		return console.error(err);
	}
	console.log("文件打开成功!");
	console.log(fd);
});

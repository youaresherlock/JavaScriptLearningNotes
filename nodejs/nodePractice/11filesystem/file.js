//Node.js文件系统(fs)模块中的方法具有异步和同步版本, fs.readFile()和fs.readFileSync() 
//异步的方法函数最后一个参数为回调函数回调函数的第一个参数包含了错误信息(error)


var fs = require("fs");

//异步读取
fs.readFile("input.txt", function(err, data) {
	if(err) {
		return console.error(err);
	}
	console.log("异步读取: " + data.toString());
});

//同步读取
var data = fs.readFileSync("input.txt");
console.log("同步读取: " + data.toString());

console.log("程序执行完毕.");

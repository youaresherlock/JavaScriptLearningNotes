//创建目录
//fs.mkdir(path[,options], callback)
//path: 文件路径 callback-回调函数,没有参数
//options参数可以是: recursive- 是否以递归的方式创建目录，默认为false mode-设置目录权限,默认为0777.
var fs = require("fs");
console.log("创建目录 /tmp/test/");
fs.mkdir("/tmp/test/",{recursive: true},  function(err) {
	if(err) {
		return console.error(err);
	}
	console.log("目录创建成功");
});

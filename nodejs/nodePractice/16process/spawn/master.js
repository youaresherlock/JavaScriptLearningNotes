//child_process.spawn(command[,args][,options])
//使用给定的command衍生一个新进程,并带上args中的命令行参数.如果省略args,则其默认为空数组
const fs = require("fs");
const child_process = require("child_process");

for(let i = 0; i < 3; i++) {
	var workerProcess = child_process.spawn("node", ["support.js", i]);
	
	//process.stdout属性返回连接到stdout(fd 1)的流,他是一个net.Socket流(双工)
	workerProcess.stdout.on("data", function(data) {
		console.log("stdout: " + data);
	});
	
	workerProcess.stderr.on("data", function(data) {
		console.log("stderr: " + data);
	});
		
	workerProcess.on("close", function(code) {
		console.log("子进程" + i + "已退出,退出码 " + code);
	});
}


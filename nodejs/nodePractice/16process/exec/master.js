const fs = require("fs");
const child_process = require("child_process");

//child_process.exec(command[,options][,callback])
//options中timeout参数默认是0,如果设置成大于0,超时父进程会发送带killSignal属性的信号
for(let i = 0; i < 3; i++) {
	//function(err, stdout, stderr)进程终止时调用)
	var workerProcess = child_process.exec("node support.js " + i, function(error, stdout, stderr) {
		if(error) {
			console.log(error.stack);
			console.log("Error code: "  + error.code); //子进程的退出码
			console.log("signal received: " + error.signal); //种植进程的信号
		}
		console.log("stdout: " + stdout);
		console.log("stderr: " + stderr);
	});
	
	//workerProcess是ChildProcess类的实例,都是EventEmitter
	//exit事件.当子进程结束后出发,如果进程退出,则code是进程的最终退出码,否则为null.
	workerProcess.on("exit", function(code) {
		console.log("子进程" + i +  "已退出,退出码 " + code); //除0以外的任何退出码都被是为出错
	});
};

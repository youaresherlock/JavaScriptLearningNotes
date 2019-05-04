//child_process.fork(modulePath[,args][,options])
/*
modulePath 要在子进程中运行的模块
args 字符串参数的列表
options 额外选项对象
child_process.fork()方法是child_process.spawn()的一个特例，专门用于衍生新的node.js进程.返回的ChildProcess会内置一个额外的通信通道,
允许消息在父进程和子进程之间来回传递.
注意，衍生的 Node.js 子进程独立于父进程，但两者之间建立的 IPC 通信通道除外。 每个进程都有自己的内存，带有自己的 V8 实例。 由于需要额外的资源分配，因此不建议衍生大量的 Node.js 子进程。
*/
const fs = require("fs");
const child_process = require("child_process");

for(let i = 0; i < 3; i++) {
	var worker_process = child_process.fork("support.js", [i]);
	
	worker_process.on("close", function(code) {
		console.log("子进程" + i + "已退出,退出码 " + code);
	});
}

//setInterval(cb, ms)全局函数在指定的毫秒数后执行指定函数cb
//setInterval()方法会不停地调用函数,直到clearInterval()被调用或窗口被关闭
function printHello() {
	console.log("hello world");
}

setInterval(printHello, 2000);


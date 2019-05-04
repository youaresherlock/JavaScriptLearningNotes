//setTimeout(cb, ms)全局函数在指定的毫秒(ms)数后执行指定函数(cb).setTimeout()只执行一次指定函数
//返回一个代表定时器的句柄值
function printHello() {
	console.log("Hello World");
}

setTimeout(printHello, 2000);

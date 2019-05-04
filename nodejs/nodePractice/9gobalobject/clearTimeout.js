//clearTimeout(t)全局函数用于停止一个之前通过setTimeout()创建的定时器.参数i
//t是通过setTimeout()函数创建的定时器
function printHello() {
	console.log("hello world");
}

// 两秒后执行以上函数
var t = setTimeout(printHello, 2000);

//清除定时器
clearTimeout(t);

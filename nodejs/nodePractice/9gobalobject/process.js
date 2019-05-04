//Process提供了很多游泳的方法便于我们更好的控制系统的交互
//cwd() 返回当前进程的工作目录
//memoryUsage() 返回一个对象描述了Node进程所用的内存状况,单位为字节
//execPath属性获取执行路径 platform属性获取平台信息 pid属性返回当前进程的pid

//输出当前目录
console.log("当前目录: " + process.cwd());

//输出当前版本
console.log("当前版本: " + process.version);

setInterval(function() {
console.log("hello");
}, 1500);

//输出内存使用情况
console.log(process.memoryUsage());


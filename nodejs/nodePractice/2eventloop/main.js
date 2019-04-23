//.js单进程单线程应用程序，因为V8引擎提供的异步执行回调接口，通过这些接口可以处理大量的并发，所以性能非常高
//Node.js几乎每一个API都是支持回调函数的.Node.js基本上所有的事件机制都是用设计中观察者模式实现
//引入events模块
var events = require("events");
//创建eventEmitter对象
var eventEmitter = new events.EventEmitter();

//处理事件处理程序
var connectHandler = function connected() {
	console.log("连接成功");
	
	//触发data_received事件
	eventEmitter.emit("data_received");
}

//绑定connection处理程序
eventEmitter.on("connection", connectHandler);

//使用匿名函数绑定 data received事件
eventEmitter.on("data_received", function() {
	console.log("数据接受成功");
});

//触发connection事件
eventEmitter.emit("connection");

console.log("程序执行完毕");

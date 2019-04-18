//EventEmitter定义了一个特殊的事件error,它包含了错误的语义，我们在遇到异常的时候通常会触发error事件
//当error被触发时，EventEmitter规定如果没有响应的监听器，Node.js会把它当做异常，退出程序并输出错误信息
var events = require("events");
var emitter = new events.EventEmitter();
emitter.emit("error");//主动触发，由于没有对应的监听器，整个程序崩溃


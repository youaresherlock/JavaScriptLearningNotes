
Node.js Stream流
Stream是一个抽象接口，Node中有很多对象实现了这个接口。例如，对http服务器发起请求的request对象就是一个Stream,还有sdout(标准输出)
Node.js, Stream有四种流类型
Readable -可读操作
Writable -可写操作
Duplex -可读可写操作
Transform -操作被写入数据，然后读出结果
所有的Stream对象都是EventEmitter的实例。常用的事件有:
data -当有数据可读时触发
end -没有更多的数据可读时触发
error -在接受和写入过程中发生错误时触发.
finish -所有数据已被写入到底层系统时触发.


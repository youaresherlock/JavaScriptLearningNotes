//管道的概念
//管道一种最基本的IPC机制，作用于有血缘关系的进程，完成数据传递.调用pipe系统函数即可创建一个管道.
//1. 其本质是一个伪文件(实为内核缓冲区)
//2. 由两个文件描述符引用，一个表示读，表示写端
//3. 规定数据从管道写端流入管道，从读端流出
//4. 管道实为内存使用环形队列机制，借助内核缓冲区4k实现
//5. 管道提供了一个输出流到输入流的机制，通常用于从一个流中获取数据并将数据传递到另一个流中
var fs = require("fs");

//创建一个可读流
var readerStream = fs.createReadStream("input.txt");

//创建一个流
var writerStream = fs.createWriteStream("output.txt");

//管道读写操作
//读取input.txt文件内容，并将内容写入output.txt文件中
readerStream.pipe(writerStream);

console.log("程序执行完毕");


//写入Node缓冲区的语法buf.write(string[,offset[,length][,encoding])
//string写入缓冲区的字符串offset默认为0， length写入的字节数,默认为buffer.length,encoding默认为"utf-8"
//返回实际写入的大小。如果buffer空间不足，则只会写入部分字符串
buf = Buffer.alloc(256);
len = buf.write("www.runnob.com");

console.log("写入字节数: " + len);


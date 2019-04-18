//缓冲区裁剪
//buf.slice([start[,end]])
//返回一个新的缓冲区,它和旧缓冲区指向同一块内存，但是从索引start到end的位置裁剪
var buffer1 = Buffer.from("runoob");
//剪切缓冲区
var buffer2 = buffer1.slice(0, 2);
console.log("buffer2 content: " + buffer2.toString());
//返回Buffer对象所占据的内存长度
console.log("buffer2 length: " + buffer2.length);



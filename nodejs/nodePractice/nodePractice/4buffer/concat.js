//缓冲区合并
//Buffer.concat(list[. totalLength])
//list用于合并的Buffer对象数组列表
//totalLength指定合并后Buffer对象的总长度
//返回值 一个多个成员的新Buffer对象
var buffer1 = Buffer.from("菜鸟教程");
var buffer2 = Buffer.from("www.runoob.com");
var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log("buffer3 内容: " + buffer3.toString());



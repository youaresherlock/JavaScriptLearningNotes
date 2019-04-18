//拷贝缓冲区
//buf.copy(targetBuffer[, targetStart[, sourceStart[,sourceEnd]]])
var buf1 = Buffer.from('abcdefghijkl');
var buf2 = Buffer.from('RUNOOB');

//将buf2插入到buf2指定位置上
buf2.copy(buf1, 2);

console.log(buf1.toString());


//缓冲区比较
//buf.compare(otherBuffer)
//返回值，返回一个数字，表示buf在otherBuffer之前，之后或相同
var buffer1 = Buffer.from("abc");
var buffer2 = Buffer.from("abcd");
var result = buffer1.compare(buffer2);

if(result < 0) {
	console.log(buffer1 + " 在 " + buffer2 + "之前");
}else if(result == 0){
	console.log(buffer1 + " 与 " + buffer2 + "相同");
}else {
	console.log(buffer1 + " 在 " + buffer2 + "之后");
}

//从缓冲区读取数据
//buf.toString([encoding[,start[,end]]])
//encoding默认utf8. start默认为0 end默认缓冲区的末尾buffer.length
//返回值 解码缓冲区数据并指定的编码返回字符串
buf = Buffer.alloc(26);
for(var i = 0; i < 26; i++) {
	buf[i] = i+ 97;
}

console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));   // 输出: abcde
console.log( buf.toString('utf8',0,5));    // 输出: abcde
console.log( buf.toString(undefined ,0,5)); // 使用 'utf8' 编码, 并输出: abcde


//链式流
//链式通过连接输出流到另外一个流并创建多个流操作链的。链式用于管道操作。
//接下来我们就是用管道和来压缩和解压文件
const fs = require("fs");
const zlib = require("zlib");

//压缩input.txt文件为nput.txt.gz
//zlib模块提供通过ip,和Deflate/inflate的压缩，const zlib = require("zlib");
//压缩或解压数据流(例如一个文件)通过zlib流将元数据流传输到目标流来完成
const gzip = zlib.createGzip();
const inp = fs.createReadStream("input.txt");
const out = fs.createWriteStream("input.txt.gz");

inp.pipe(gzip).pipe(out);

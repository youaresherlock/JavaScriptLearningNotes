//解压文件
const fs = require("fs");
var zlib = require("zlib");

//解压input.txt.gz文件为input.txt
fs.createReadStream("input.txt.gz")
	.pipe(zlib.createGunzip())
	.pipe(fs.createWriteStream("unziped.txt"));

console.log("文件解压完成");

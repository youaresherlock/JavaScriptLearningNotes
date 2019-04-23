//读取文件阻塞代码示例

// fsfile-system的简写，就是的意思
// 在Node中如果进行文件操作，就必须引入fs这个核心，它提供了所有的文件操作相关的API
var fs = require("fs");

var data = fs.readFileSync("input.txt");

console.log(data.toString());
console.log("程序执行结束!");

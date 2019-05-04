//process.argv属性返回一个数组.第一个元素是process.execPath(
//返回启动Node.js进程的可执行文件的绝对路径名)).第二个元素是正在执行的js文件的路径,其余元素是其他命令行参数
//console.log(process.argv);
console.log("进程 " + process.argv[2] + " 执行.");

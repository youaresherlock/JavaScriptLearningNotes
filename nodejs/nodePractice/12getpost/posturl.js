//POST请求的内容全部都在请求体中http.ServerRequest并没有一个属性内容为请求体,原因是等待请求体传输可能是一件耗时的工作i
//比如上传文件,而很多时候我们可能并不需要理会请求体的内容，恶意的POST请求会大大消耗服务器的资源，所以node.js默认是不会解析
//请求体的,当你需要的时候需要手动来做
var http = require("http");
var querystring = require("querystring");
var util = require("util");


http.createServer(function(req, res) {
	//定义了一个post变量，用于暂存请求体的信息
	var post = '';
	
	//通过req的data事件监听函数,每当接受到请求体的数据，就累加到post变量中
	req.on('data', function(chunk) {
		post += chunk;
	});
	
	//在end事件触发后,通过querystring.parse将post解析为真正的POST请求格式,然后向客户端返回.
	req.on("end", function(){
		post = querystring.parse(post);
		res.end(util.inspect(post));
	});
}).listen(4000);

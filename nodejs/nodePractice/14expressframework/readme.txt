Express框架
Express是一个简介而灵活的node.js Web应用框架,提供了一系列强大特性帮助你创建各种web应用,和丰富的http工具
使用Expess可以快速地搭建一个完整功能的网站
Express框架核心特征:
	可以设置中间件来响应HTTP请求
	定义了路由表用于执行不同的Http请求动作
	可以通过向模板产地参数来动态渲染HTML页面
安装
$ cnpm install express --save
$ cnpm install body-parser --save
$ cnpm install cookie-parser --save
$ cnpm install multer --save
这里使用的是淘宝镜像,也可以使用npm安装
body-parser - node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
cookie-parser - 这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。
multer - node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据。
安装完成后可以查看express版本号 
$ npm list express

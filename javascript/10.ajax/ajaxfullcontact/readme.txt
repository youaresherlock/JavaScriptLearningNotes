imooc Ajax全接触课程

第一章
1-1 Ajax全接触课程介绍
Asynchronous JavaScript and XML(异步的JavaScript和XML)
Ajax不是某种编程语言，是一种在无需重新加载整个网页的情况之
下能够更新部分网页的技术.使用了ajax技术的网页，通过在后台
跟服务器进行少量的数据交换，网页就可以实现异步局部更新


第二章 Ajax概念介绍
2-1 Ajax-同步和异步

概念介绍
运用HTML和CSS来实现页面，表达信息
运用XMLHttpRequest和web服务器进行数据的异步交换
运用JavaScript操作DOM,实现动态局部刷新


2-2 Ajax-XMLHttpRequest对象创建
var request = new XMLHttpRequest();
var request;
if(window.XMLHttpRequest) {
    request = new XMLHttpRequest(); //IE7+,Firefox,Chrom,Opera,Safari..
} else {
    request = new ActiveXObject("Microsoft.XMLHTTP"); //IE5, 6
}


2-3 Ajax-HTTP请求
http是计算机通过网络进行通信的规则
一个完整的HTTP请求过程，通过有下面7个步骤:
1. 建立TCP连接
2. Web浏览器向Web服务器发送请求命令
3. Web浏览器发送请求头信息
4. Web服务器应答
5. Web服务器发送应答头信息
6. Web服务器向浏览器发送数据
7. Web服务器关闭TCP连接

一个HTTP请求一般由四部分组成:
1. HTTP请求的方法或动作，比如是GET还是POST请求
2. 正在请求的URL，总得知道请求的地址是什么
3. 请求头,包含一些客户端环境信息，身份验证信息等
4. 请求体，也就是请求正文，请求正文中可以包含客户提交的查询字符串信息，表单信息等等

GET: 一般用于信息获取，使用URL传递参数，对所发送信息的数量也有限制，一般在2000个字符
POST: 一般用于修改服务器上的资源.对所发送信息的数量无限制

一个HTTP响应一般又三部分组成:
1. 一个数字和文字组成的状态码，用来显示请求是成功还是失败
2. 响应头，响应头也和请求头一样包含许多有用的信息，例如服务器类型、日期时间、内容类型和长度等
3. 响应体，也就是响应正文

HTTP状态码由3位数字构成，其中首位数字定义了状态码的类型:
1XX: 信息类，表示收到Web浏览器请求，正在进一步的处理中
2XX: 成功，表示用户请求被正确接受，理解和处理 例如: 200 OK
3XX: 重定向，表示请求没有成功，客户必须采取进一步的动作
4XX: 客户端错误，表示客户端提交的请求有错误 例如: 404 NOT Found,意味着
    请求中所引用的文档不存在
5XX: 服务器错误，表示服务器不能完成对请求的处理 例如 500


2-4 Ajax-XMLHttpRequest发送请求
open(method, url, async)
send(string)
eg:
request.open("POST", "create.php", true);
request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
request.send("name=王二狗&sex=男");


2-5 Ajax-XMLHttpRequest取得响应
responseText: 获得字符串形式的响应数据
responseXML: 获取XML形式的响应数据
status和statusText: 以数字和文本形式返回HTTP状态码
getAllResponseHeader(): 获取所有的响应报头
getResponseHeader(): 查询响应中的某个字段的值

readyState属性
存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。
0: 请求未初始化, open还没有调用
1: 服务器连接已建立, open已经调用了
2: 请求已接收, 也就是接受到头信息了
3: 请求处理中, 也就是接受到响应主体了
4: 请求已完成，且响应已就绪

每当readyState改变时，就会触发onreadystatechange事件
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange=function()
{
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    }
}
xmlhttp.open("GET", "get.php", true);
xmlhttp.send();


3-1 Ajax-例子简介
1. 查询员工信息，可以通过输入员工编号查询员工基本信息;
2. 新建员工信息，包含员工姓名，员工编号，员工性别，员工职位;

纯html页面，用来实现员工查询和新建的页面;
php页面，用来实现查询员工和新建员工的后台接口;

PHP是一种创建动态交互性站点的服务器端脚本语言
PHP能够生成动态页面内容
PHP能够创建、打开、读取、写入、删除以及关闭服务器上的文件
PHP能够接受表单数据
PHP能够发送并取回cookies
PHP能够添加、删除、修改数据库中的数据
PHP能够限制用户访问网站中的某些页面

运行PHP
XAMMP(apache,php,perl,mysql)，https://www.apachefriends.org/zh_cn/index.html
在Dreamweaver中配置web服务器用于本地测试


3-2 Ajax-服务器端实现
xampp-control.exe运行GUI界面
如果80端口冲突,则修改httpd.conf设置apache监听端口,在htdocs下设置站点文件夹

php测试页面
PHP脚本以<?php开头,以?>结尾
PHP文件的默认文件扩展名是.php
PHP语句以分号结尾(;)

编写server.php服务端代码
注: (浏览器将以plain文本,utf-8编码读取,注意Content-Type设置)


3-3 PHP服务端代码测试

可以使用浏览器直接get请求
eg: 浏览器get http://127.0.0.1:8080/ajaxdemo/server.php?number=101


fidder使用composer工具发送post请求:
    POST http://localhost:8080/ajaxdemo/server.php
header如下:
User-Agent: Fiddler
Host: localhost:8080
Content-Type: application/x-www-form-urlencoded
Content-Length: 49
request body如下:
name=clarence&sex=男&job=程序员&number=104


3-4 客户端实现
XMLHttpRequest.html


4-1 json基本概念
JSON数据的书写格式是: 名称/值对
JSON: JavaScript对象标识法(JavaScript Object Notation)
JSON是存储和交换文本信息的语法，类似于XML.它采用键值对的方式来组织，易于
人们阅读和编写，同时也易于机器解析和生成
JSON是独立于语言的，也就是说不管什么语言，都可以解析json,只需要按照json的规则来就行

JSON与XML比较
json的长度和xml格式比起来很短小
json读写的速度更快
json可以使用JavaScript内建的方法直接进行解析，转换成JavaScript对象，非常方便

JSON通常用于与服务端交换数据
在接受服务端数据时一般是字符串
我们可以使用JSON.parse()方法将数据转换为js对象


4-2 json解析、格式化和校验工具
eval和JSON.parse
在代码中使用eval是很危险的。特别是用它执行第三方的JSON数据(其中可能包含恶意代码)，尽可能
使用JSON.parse()方法解析字符串本身，该方法还可以捕捉JSON中的语法错误


eval()函数计算js字符串，并把它作为脚本代码运行
eval(string) 如果是表达式，执行表达式，如果是js语句，eval()将执行js语句

JSON.parse(text[,reciver])
text: 必须，一个有效的JSON字符串
reviver: 可选，一个转换结果的函数，将为对象的每个成员调用此函数,参数(key, value)


json校验工具: jsonlint.com


JSON用于服务端交换数据
serverjson.php编写(设置请求头，返回json格式数据)
XMLHttpRequestJson.html编写(解析服务端返回的json数据，并改变dom)
注:
jQuery.getJSON( url [, data ] [, success ] )等价于
$.ajax({
  dataType: "json",
  url: url,
  data: data,
  success: success
});

5-1 JQuery中的AJAX
参考文档: 
https://api.jquery.com/jQuery.ajax/
一般来说，不会直接使用原生js实现ajax请求，经常借助于各种js框架来实现各种需求(可以尽量兼容各种浏览器)，
通过jQuery Ajax方法，你能够使用HTTP Get和HTTP Post从远程服务器上请求文本、HTML、XML或JSON-同时你能
把这些外部数据直接载入网页的被选元素中

jQuery.ajax(url, settings)接受一个URL和一个可选的settings对象，常用的选项如下:
async: 是否异步执行AJAX请求,默认为true
method: 发送的Method, 缺省为"GET"
contentType: 发送POST请求的格式,默认为"application/x-www-form-urlencoded; charset=UTF-8",
    也可以指定为text/plain、application/json
    data: 发送的字符串、数组或Object.如果是GET请求,data将被转换成query附加到URL上，如果是POST请求，
    根据Content-Type把data序列化成合适的格式
headers: 发送的额外的HTTP头，必须是一个object.
dataType: 接受的数据格式，可以指定为"html"、"xml"、"text"等，缺省情况下根据响应的Content-Type猜测
详细的可以看文档


创建XMLHttpRequestJquery.html
这里使用了CDN下载jquery压缩版库，大家可以从jquery下载到本地引用
<script src="https://cdn.bootcss.com/jquery/3.4.0/jquery.min.js"></script>

注: Http头部Origin字段是用来标识出最初请求是从哪里发起
跨域的时候get，post都会显示origin，同域的时候get不显示origin，post显示origin(开发者工具可以查看request header)


6-1 处理跨域方式--代理
跨域:
一个域名地址的组成:
http:// www . abc.com : 8080 / scripts/jquery.js
协议    子域名  主域名   端口号    请求资源
同源指的是三个相同: 协议相同、域名相同、端口相同
同源政策的目的是为了保证用户信息的安全，防止恶意的网站窃取数据
如果非同源,共有三种行为受到限制:
(1) Cookie、LocalStorage和IndexedDB无法读取
(2) DOM无法获得
(3) Ajax请求无效(可以发送，但浏览器会拒绝接受响应)
注: 浏览器允许跨域引用JavaScript资源，浏览器请求script资源不受
同源策略限制，并且请求到script资源后立即执行(所以可以用jsonp方法跨域)

常见的跨域策略:
(1) 架设服务器代理(浏览器请求同源服务器，再由后者请求外部服务)
(2) JSONP 
    网页通过添加一个<script>元素，向服务器请求JSON数据，这种做法不受同源限制;
服务器收到请求后，将数据放在一个指定名字的回调函数里传回来.
    请求的查询字符串有一个callback参数，用来指定回调函数的名字,这对于JSONP是必需的
    只要浏览器定义了callback函数，该函数就会立即调用。作为参数的JSON数据被视为JS对象，
而不是字符串,避免使用了JSON.parse的步骤
(3) WebSocket
    一种通信协议,使用ws://(非加密)和wss://(加密)作为协议前缀，该协议不实行同源政策,只要
服务器支持，就可以通过它进行跨域通信
(4) CORS
    CORS是跨源资源分享（Cross-Origin Resource Sharing）的缩写。它是W3C标准，是跨源
AJAX请求的根本解决方法。相比JSONP只能发GET请求，CORS允许任何类型的请求


6-2 处理跨域方式--JSONP
JSONP可用于解决主流浏览器的跨域数据访问的问题
如客户想访问 : http://www.runoob.com/try/ajax/jsonp.php?jsoncallback=callbackFunction
假设客户期望返回JSON数据：["customername1","customername2"]。
真正返回到客户端的数据显示为: callbackFunction(["customername1","customername2"])。
在www.aaa.com页面中:
<script>
function jsonp(json) {
    alert(json["name"]);
}
</script>
<script src="http://www.bbb.com/jsonp.js?callback=jsonp"></script>
在www.bbb.com页面中:
jsonp({"name" : "洪七", "age" : 24});
原生js实现jsonp可以查看http://www.runoob.com/json/json-jsonp.html案例

使用Jquery实现jsonp跨域访问(修改get请求客户端和服务端代码)
编写客户端代码XMLHttpRequestjQueryJsonp.html 
编写服务端代码serverjsonp.php
将XMLHttpRequestjQueryJsonp.html放在另一个本地服务器下，监听80端口，进行跨域请求
，如下截图可以看到Request Headers Referer字段信息，传递的参数是:
number=123&callbackName=jQuery340023517505541186856_1556114398300&_=1556114398301
可以看到服务端拿到的回调函数名称就是jQuery340023517505541186856_1556114398300
这个是唯一前端jquery自动生成的,另外可以看到Request URL已经添加了参数


6-3 处理跨域方式--CORS
serverjson2.php
在服务端做一些小小的改造即可: 
header("Access-Control-Allow-Origin: *"); //跨域资源共享,所有域都可以访问
header("Access-Control-Allow-Methods: POST,GET"); //支持跨域的方法
另外由于我们的XMLHttpRequestjQuery1.html从另一个服务器加载该页面发起请求.(POST和Get都是支持的
)
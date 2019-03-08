Websocket 
websocket官网:  http://www.websocket.org/
HTML5
Web端的socket,server和client可以互相发送消息
本质是TCP连接


websocket简介:
是HTML5开始提供的一种在单个TCP连接上进行全双工通讯的协议。
websocket使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。
在WebSocket API中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的链接，
并进行双向数据传输

网站推送技术： 
Ajax轮询，在特定的时间间隔，由浏览器对服务器发出HTTP请求，然后由服务端
返回最新的数据给客户端的浏览器。(缺点是浏览器需要不断的向服务器发出请求，然后HTTP请求可能
包含较长的头部，其中真正有效的数据可能只是很小的一部分，这样会浪费很多的带宽等资源)

document: 
https://developer.mozilla.org/en-US/docs/Glossary/WebSockets
https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

HTML5定义的WebSocket协议，能更好的节省服务器资源和带宽，并且能够更实时地进行通讯
一开始的握手需要借助http请求完成,HTTP协议只是在建立连接时使用，建立连接后通过TCP协议传输，不再
需要HTTP协议

浏览器通过javascript向服务器发出建立WebSocket连接的请求，连接建立以后，
客户端和服务端就可以通过TCP连接直接交换数据。
当你获取WebSocket连接后，你可以通过send()方法来向服务器发送数据，并通过
onmessage事件来接收服务器返回的数据
var socket = new WebSocket(url, [protocol]);
url: 指定连接的URL
protocol: 可选的，指定了可接受的子协议

WebSocket事件
open	Socket.onopen	连接建立时触发
message	Socket.onmessage	客户端接收服务端数据时触发
error	Socket.onerror	通信发生错误时触发
close	Socket.onclose	连接关闭时触发

WebSocket方法
Socket.send()	使用连接发送数据
Socket.close()	关闭连接


*使用js脚本建立websocket连接，并交互数据:*
demo1 `index.html`
官网示例: http://www.websocket.org/echo.html
```html {line-numbers}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Websocket</title>
</head>
<body>
    <h1>Echo Test</h1>
    <input type="text" id="sendTxt">
    <button id="sendBtn">发送</button>
    <div id="recv"></div>
    <script>
        // 官方提供的websocket server地址
        var websocket = new WebSocket("ws://echo.websocket.org/");
        // Socket.onopen 事件 连接建立时触发
        websocket.onopen = function() {
            console.log('websocket open');
            document.getElementById('recv').innerHTML = "Connected";
        }
        // 连接关闭时触发
        websocket.onclose = function() {
            console.log('websocket close');
        }
        // 客户端接收服务端数据时触发 e是MessageEvent
        websocket.onmessage = function(e) {
            console.log(e.data);
            document.getElementById("recv").innerHTML = e.data;
        }
        document.getElementById("sendBtn").onclick = function() {
            var txt = document.getElementById("sendTxt").value;
            websocket.send(txt);
        }
    </script>
</body>
</html>
```

*搭建自己的websocket server服务器:*
我们知道后端语言非常的多，有很多种对websocket支持的服务器
如下所示:
```
php - http://code.google.com/p/phpwebsocket/
jetty - http://jetty.codehaus.org/jetty/（版本7开始支持websocket）
netty - http://www.jboss.org/netty
ruby - http://github.com/gimite/web-socket-ruby
Kaazing - https://web.archive.org/web/20100923224709/http://www.kaazing.org/confluence/display/KAAZING/Home
Tomcat - http://tomcat.apache.org/（7.0.27支持websocket，建议用tomcat8，7.0.27中的接口已经过时）
WebLogic - http://www.oracle.com/us/products/middleware/cloud-app-foundation/weblogic/overview/index.html（12.1.2開始支持）
node.js - https://github.com/Worlize/WebSocket-Node
node.js - http://socket.io
nginx - http://nginx.com/
mojolicious - http://mojolicio.us/
python - https://github.com/abourget/gevent-socketio
Django - https://github.com/stephenmcd/django-socketio
erlang - https://github.com/ninenines/cowboy.git
```

Node.js是一个基于Chrome V8引擎的JavaScript运行环境。使用了一个事件驱动、非阻塞式I/O的模型，使其轻量又高效。我们可以使用nodejs搭建websocket服务器
我使用的是ubuntu linux(windows官网下载), 以及nodejs-websocket模块
官网: [official website](https://nodejs.org/en/)
参考文档: [nodejs github](https://github.com/nodejs/nodejs.org)  &nbsp;&nbsp;&nbsp;&nbsp;[nodejs-websocket](nodejs-websocket) --- a node.js module for websocket server and client 

ubuntu安装nodejs、 npm、以及nodejs-websocket
注: 使用Ubuntu apt-get安装nodejs,版本太低，建议使用源码安装，或者换源[参考博客](https://blog.csdn.net/qq_16481211/article/details/81114286)
```
在Github上获取Node.js源码:
$ sudo git clone https://github.com/nodejs/node.git
Cloning into 'node'...
修改目录权限: 
$ sudo chmod -R 755 node
使用./configure创建编译文件:
$ cd node
$ sudo ./configure
$ sudo make
$ sudo make install
查看node版本:
$ node --version
v12.0.0-pre
安装nodejs-websocket模块
npm install nodejs-websocket 
```
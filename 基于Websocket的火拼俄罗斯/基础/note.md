>建议阅读时间:   1 hour
在学习websocket中，查阅了大量的中英文资料，这里将成果分享给大家:blush:

___

#### Websocket 

websocket官网:  [websocket官网](http://www.websocket.org/)


##### 1. websocket简介:

>&emsp; WebSocket是HTML5开始提供的一种在单个TCP连接上进行全双工通讯的协议。websocket使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在WebSocket API中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的链接，并进行双向数据传输


**网站推送技术：** 

>&emsp; Ajax轮询，在特定的时间间隔，由浏览器对服务器发出HTTP请求，然后由服务端返回最新的数据给客户端的浏览器。(缺点是浏览器需要不断的向服务器发出请求，然后HTTP请求可能包含较长的头部，其中真正有效的数据可能只是很小的一部分，这样会浪费很多的带宽等资源)


**websocket document:** 

>[mozilla websockets](https://developer.mozilla.org/en-US/docs/Glossary/WebSockets)
[mozilla websocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)


**websocket的优点:** 

>&emsp; HTML5定义的WebSocket协议，能更好的节省服务器资源和带宽，并且能够更实时地进行通讯一开始的握手需要借助http请求完成,HTTP协议只是在建立连接时使用，建立连接后通过TCP协议传输，不再需要HTTP协议。通过WebSocket的长连接，客户端和服务端可以进行大量的数据传输而不会带来相关的性能问题，这给Web端带来了极大的功能增强。
>&emsp; 目前Web端可以使用WebSocket来进行IM相关功能开发，或者实时协作等需要与服务器进行大量数据交互的功能，并且不需要像之前一样使用长轮询的Hack方式来实现
>&emsp; 浏览器通过javascript向服务器发出建立WebSocket连接的请求，连接建立以后，客户端和服务端就可以通过TCP连接直接交换数据。当你获取WebSocket连接后，你可以通过send()方法来向服务器发送数据，并通过onmessage事件来接收服务器返回的数据


**websocket API** 

```
var socket = new WebSocket(url, [protocol]);
url: 指定连接的URL
protocol: 可选的，指定了可接受的子协议```

WebSocket事件
open	Socket.onopen	连接建立时触发
message	Socket.onmessage	客户端接收服务端数据时触发
error	Socket.onerror	通信发生错误时触发
close	Socket.onclose	连接关闭时触发

WebSocket方法
Socket.send()	使用连接发送数据
Socket.close()	关闭连接
```

___

##### 2. websocket初步使用

**使用js脚本建立websocket连接，并交互数据:**
我们服务端使用的是官网的给出的地址，此处简单实现客户端
**demo1:**
`index.html`
官网示例: [websocket官网示例](http://www.websocket.org/echo.html)

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

___


##### 3. 使用node.js搭建自己的websocket server服务器

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

**Node.js简介**

>&emsp;Node.js是一个基于Chrome V8引擎的JavaScript运行环境。使用了一个事件驱动、非阻塞式I/O的模型，使其轻量又高效。我们可以使用nodejs搭建websocket服务器


>&emsp;开发环境: 我使用的是ubuntu linux(windows官网自行下载), 以及nodejs-websocket模块


**文档地址:** 

>官网: [official website](https://nodejs.org/en/)
参考文档: [nodejs github](https://github.com/nodejs/nodejs.org)  &nbsp;&nbsp;&nbsp;&nbsp;[nodejs-websocket](nodejs-websocket) --- a node.js module for websocket server and client  &nbsp;&nbsp;&nbsp;&nbsp;[官方文档翻译的中文博客](https://www.jianshu.com/p/f0baf93a3795)


**ubuntu安装nodejs、 npm、以及nodejs-websocket**
<font color="#faaaaa" size=3>
注: 使用Ubuntu apt-get安装nodejs,版本太低，建议使用源码安装，或者换源[参考博客](https://blog.csdn.net/qq_16481211/article/details/81114286)
</font>

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
启动wsServer.js进程，注杀死node进程可以使用(pkill node、tskill node): 
$ node wsServer.js
```

___

##### 4. 实现简单聊天室并优化

**demo2:**
`wsServer.js`如下 

```javascript {line-numbers}
var ws = require("nodejs-websocket");

// Scream server example : "hi" -> "HI!!!" 将用户从表单传入的字符串转化为大写字母传送给用户
const hostname = 'xxx.xxx.xxx.xxx';
const port = 8001;

// Scream server example : "hi" -> "HI!!!"
var server = ws.createServer(function(conn) {
    console.log('Server running at ws://%s:%d/', hostname, port);
    conn.on("text", function(str) {
        console.log("Received" + str);
        conn.sendText(str.toUpperCase() + "!!!");
    });
    conn.on("close", function(code, reason) {
        console.log("Connection closed");
    });
    conn.on("error", function(err) {
        console.log("handle err");
        console.log(err);
    });
}).listen(port);
```

<font color="#faaaaa" size=3>打开浏览器，将客户端中的index.html中url换掉你自己服务器的，测试成功</font>


**websocket实现简单聊天功能:**
聊天室思路是客户端发送数据到服务器，然后服务器遍历所有的聊天室中的连接，
将消息广播出去，通过浏览器改变dom结构，呈现广播文本。
**demo3:** 
`wsServer.js`

```javascript {line-numbers}
var ws = require("nodejs-websocket");

const hostname = 'xxx.xxx.xxx.xxx';
const port = 8001;

// 客户端计数器
var clientCount = 0;

// Scream server example : "hi" -> "HI!!!"
// 创建一个server对象, ws是引入nodejs-websocket后的主要对象
var server = ws.createServer(function(conn) {
    console.log("New connection");
    clientCount++;
    conn.nickname = 'user' + clientCount; 
    broadcast(conn.nickname + " comes in");

    // 收到文本时触发,str是收到的文本字符串
    conn.on("text", function(str) {
        console.log("Received" + str);
        broadcast(str);
    });
    // 连接关闭时触发
    conn.on("close", function(code, reason) {
        console.log("Connection closed");
        broadcast(conn.nickname + ' left');
    });
    // 发生错误时触发，如果握手无效，也会发出响应
    conn.on("error", function(err) {
        console.log("handle err");
        console.log(err);
    });
}).listen(port);

console.log("websocket server listening on port: " + port + ", on hostname: " + hostname);

// server.connections返回包含所有connection的数组，可以用来广播所有消息
// 服务端广播
function broadcast(msg) {
    server.connections.forEach(function(conn) {
        conn.sendText(msg);
    });
}
```

`index.html`

```javascript {line-numbers}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Websocket</title>
</head>
<body>
    <h1>Chat Room</h1>
    <input type="text" id="sendTxt">
    <button id="sendBtn">发送</button>
    <script>
        function showMessage(str) {
            var div = document.createElement("div");
            div.innerHTML = str;
            document.body.appendChild(div);
        }

        var websocket = new WebSocket("ws://xxx.xxx.xxx.xxx:8001/");
        // Socket.onopen事件  连接建立时触发
        websocket.onopen = function() {
            console.log("websocket open");
            document.getElementById("sendBtn").onclick = function() {
                var txt = document.getElementById("sendTxt").value;
                if(txt) {
                    websocket.send(txt);
                }
            }
        }
        // 连接关闭时触发
        websocket.onclose = function() {
            console.log('websocket close');
        }
        // 客户端接收服务端数据时触发 e是MessageEvent
        websocket.onmessage = function(e) {
            console.log(e.data);
            showMessage(e.data);
        }
    </script>
</body>
</html>
```

**简单聊天功能优化：**
**demo4**
<font color="#faaaaa" size=3>
注: 客户端和服务端通信数据为对象，只不过是通过转化成JSON字符串来传递
</font>
`index.html`

```html {line-numbers}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Websocket</title>
</head>
<body>
    <h1>Chat Room</h1>
    <input type="text" id="sendTxt">
    <button id="sendBtn">发送</button>
    <script>
        function showMessage(str, type) {
            var div = document.createElement("div");
            div.innerHTML = str;
            if(type == "enter") {
                div.style.color = "blue";
            } else if(type == "leave") {
                div.style.color = "red";
            }
            document.body.appendChild(div);
        }

        var websocket = new WebSocket("ws://xxx.xxx.xxx.xxx:8001/");
        // Socket.onopen事件  连接建立时触发
        websocket.onopen = function() {
            console.log("websocket open");
            document.getElementById("sendBtn").onclick = function() {
                var txt = document.getElementById("sendTxt").value;
                if(txt) {
                    websocket.send(txt);
                }
            }
        }
        // 连接关闭时触发
        websocket.onclose = function() {
            console.log('websocket close');
        }
        // 客户端接收服务端数据时触发 e是MessageEvent
        websocket.onmessage = function(e) {
            console.log(e.data);
            var mes = JSON.parse(e.data);
            showMessage(mes.data, mes.type);
        }
    </script>
</body>
</html>
```

`wsServer.js`

```javascript {line-numbers}
var ws = require("nodejs-websocket");

const hostname = 'xxx.xxx.xxx.xxx';
const port = 8001;

// 客户端计数器
var clientCount = 0;

// Scream server example : "hi" -> "HI!!!"
// 创建一个server对象, ws是引入nodejs-websocket后的主要对象
var server = ws.createServer(function(conn) {
    console.log("New connection");
    clientCount++;
    conn.nickname = 'user' + clientCount; 
    // 服务器发送给客户端数据用sendText()必须是字符串，我们可以使用
    // JSON.stringify()方法将JavaScript对象转换为字符串
    var mes = {};
    mes.type = "enter";
    mes.data = conn.nickname + " comes in";
    broadcast(JSON.stringify(mes));

    // 收到文本时触发,str是收到的文本字符串
    conn.on("text", function(str) {
        console.log("Received " + str);
        var mes = {};
        mes.type = "message";
        mes.data = conn.nickname + ' says: ' + str;
        broadcast(JSON.stringify(mes));
    });
    // 连接关闭时触发
    conn.on("close", function(code, reason) {
        console.log("Connection closed");
        var mes = {};
        mes.type = "leave";
        mes.data = conn.nickname + " left";
        broadcast(JSON.stringify(mes));
    });
    // 发生错误时触发，如果握手无效，也会发出响应
    conn.on("error", function(err) {
        console.log("handle err");
        console.log(err);
    });
}).listen(port);

console.log("websocket server listening on port: " + port + ", on hostname: " + hostname);

// server.connections返回包含所有connection的数组，可以用来广播所有消息
// 服务端广播
function broadcast(msg) {
    server.connections.forEach(function(conn) {
        conn.sendText(msg);
    });
}
```

___

##### 5. 使用更方便的库Socket.IO实现上述聊天室功能

**使用Nodejs+Socket.IO打造Web在线聊天室:**
为了更加方便快捷，我们使用Socket.IO库实现上述功能
**文档地址:** 

>官网文档: [Socket.IO官方文档](https://socket.io/)
中文文档: [Socket.IO中文文档](https://www.w3cschool.cn/socket/)
中文博客: [Socket.IO blog](http://www.cnblogs.com/xiezhengcai/p/3956401.html)


**安装:**
Server:  `npm install --save socket.io`
javascript client: 
 ```1. index.html中引用[cdn](https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js)```
`2. 将其下载到客户端使用`
```3. 服务端安装socket.io会有文件node_modules/socket.io-client/dist/socket.io.js, 将其下载到客户端(A standalone build of the client is exposed by default by the  server at /socket.io/socket.io.js)```


**Socket.io简介:** 

>&emsp;是一个WebSocket库，包括了客户端的js和服务器端的nodejs,实现了实时双向的基于事件的通讯机制。它的目标是构建可以在不同浏览器和移动设备上使用的实时应用.它会自动根据浏览器从Websocket、AJAX长轮询、lframe流等各种方式中选择最佳的方式来实现网络实时应用。


**demo5**
服务端监听3000端口，监听客户端连接，连接后发送给客户端{hello: 'world'}数据，并监听客户端发送的消息
`wsServer.js`

```javascript {line-numbers}
var app = require('http').createServer();
// new Server(httpServer[,options]) httpServer: the server to bind to.
var io = require('socket.io')(app); 

app.listen(3000);
// io.on('connection', function(socket)) 监听客户端连接，回调函数会传递本次连接的socket
io.on('connection', function(socket){
    // socket.emit(eventName[, ...args][, ack]) 给该socket的客户端发送消息
    socket.emit('news', {hello : 'world'});

    // socket.on(eventName, callback) Register a new handler for the given event.
    // 监听客户端发送的消息
    socket.on('my other event', function(data) {
        console.log(data);
    })
});
```

`index.html`

```html {line-numbers}
客户端建立socket连接,然后监听服务端发送的news事件消息，并向服务器发送消息
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>websocket</title>
    <script src="socket.io.js"></script>
</head>
<body>
    <script>
        // 建立一个socket连接 io('http://xxx.xxx.xxx.xxx:3000')实际上是通过websocket协议通信的,相当于io('ws://xxx.xxx.xxx.xxx:3000')
         var socket = io('http://xxx.xxx.xxx.xxx:3000');
         // 监听服务端发送的消息 string参数与服务端emit第一个参数相同
         socket.on('news', function(data) {
             console.log(data);
             socket.emit('my other event', {my : 'data'}); // 向服务器发送消息
         })
    </script>
</body>
</html>
```


**socket.io改造聊天功能**
`wsServer.js`

```javascript {line-numbers}
var app = require("http").createServer();
var io = require('socket.io')(app);

const hostname = 'xxx.xxx.xxx.xxx';
const port = 3000;

app.listen(port);

// 客户端计数器
var clientCount = 0;

io.on('connection', function(socket) {
    clientCount ++;
    socket.nickname = 'user' + clientCount;
    // namespace.emit(eventName [, ...args]) 向所有连接的客户端发出事件
    io.emit('enter', socket.nickname + ' comes in');

    socket.on('message', function(str) {
        io.emit('mes', socket.nickname + ' says: ' + str);
    });
    
    // disconnect为默认断开连接事件
    socket.on('disconnect', function(){
        io.emit('leave', socket.nickname + ' left');
    });
});

console.log("websocket server listening on port: " + port + ", on hostname: " + hostname);
```

`index.html`

```html {line-numbers}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Websocket</title>
    <script src="socket.io.js"></script>
</head>
<body>
    <h1>Chat Room</h1>
    <input type="text" id="sendTxt">
    <button id="sendBtn">发送</button>
    <script>
        function showMessage(str, type) {
            var div = document.createElement("div");
            div.innerHTML = str;
            if(type == "enter") {
                div.style.color = "blue";
            } else if(type == "leave") {
                div.style.color = "red";
            }
            document.body.appendChild(div);
        }

        var socket = io("ws://xxx.xxx.xxx.xxx:3000/");

        document.getElementById("sendBtn").onclick = function() {
            var txt = document.getElementById("sendTxt").value;
            if(txt) {
                socket.emit('message', txt);
            }
        };

        // socket.on('String', function(data)); 监听客户端发送的信息
        socket.on('enter', function(data){
            showMessage(data, 'enter');
        });

        socket.on('leave', function(data){
            showMessage(data, 'leave');
        } );

        socket.on('mes', function(data){
            showMessage(data, 'message');
        })
       
    </script>
</body>
</html>
```

___

**小结:**

>&emsp;websocket允许浏览器和服务器建立持久连接
>&emsp;HTML5的websocket API
>&emsp;服务端使用Nodejs-websocket实现websocket server
>&emsp;使用socket.io库实现websocket(发送数据可以直接发送可序列化的对象,可以自定义消息,利用事件字符串来区分不同消息)




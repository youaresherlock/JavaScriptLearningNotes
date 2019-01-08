>适合有其他语言编程经验的人快速入门JS(全部阅读大概需要一个小时)
___
>视频教程及ppt代码地址[github](https://github.com/youaresherlock/JavaScriptLearningNotes)
___
### 5. javascript DOM
文档地址: [MDN DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
#### 1. DOM基础
##### 1. DOM基本查找方法
**(1) document.getElementById()**
语法:document.getElementById("id")
功能: 返回对拥有指定ID的第一个对象的引用
返回值: DOM对象
<font color=pink size=3>
说明: id为DOM元素上id属性的值
</font>
**(2) document.getElementsByTagName()**
语法: document.getElementsByTagName("tag")
功能: 返回一个对所有tag标签引用的集合
返回值: 数组
说明: tag为要获取的标签名称
___
##### 2. DOM 设置元素样式
**设置元素样式**
语法:  ele.style.styleName = styleValue
功能: 设置ele元素的CSS样式
<font color=pink size=3>
说明:
1、ele为要设置样式的DOM对象
2、 styleName为要设置的样式名称， 驼峰形式的表示,类似fontSize
3、 styleValue为设置的样式值
</font>
eg:
```javascript {.line-numbers}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Document</title>
</head>
<body>
    <div class="box" id="box">
    <!-- <div class="box" id="box" style="color:#0f0"> -->
        元素
    </div>
    <ul id="list">
        <li>前端开发</li>
        <li>服务器端开发</li>
        <li>UI设计</li>
    </ul>
    <ol>
        <li>javascript原生</li>
        <li>javascript框架</li>
    </ol>
    <script>
        //获取id为box的这个元素的这个文字颜色
        var box = document.getElementById("box");
        box.style.color="#f00"; 
        box.style.fontWeight="bold";
        var lis = document.getElementById("list").
            getElementsByTagName("li");
        // 遍历每一个li
        for(var i = 0, len = lis.length; i < len; i++) {
            lis[i].style.color = '#0ff';
            if(i == 0) {
                lis[i].style.backgroundColor="#ccc";
            } else if(i == 1) {
                lis[i].style.backgroundColor="#666";
            } else {
                lis[i].style.backgroundColor="#999";
            }
        }
    </script>
</body>
</html>
```
___
##### 3. DOM(innerHTML和className)
**(1) innerHTML属性的应用**
语法: ele.innerHTML
功能: 返回ele元素开始和结束标签之间的文本和html内容
eg:
```javascript {.line-numbers}
<div class="box" id="box">
<!-- <div class="box" id="box" style="color:#0f0"> -->
    元素
</div>
<ul id="list">
    <li><i>前端开发</i></li>
    <li><b>服务器端开发</b></li>
    <li>UI设计</li>
</ul>
<ol>
    <li>javascript原生</li>
    <li>javascript框架</li>
</ol>
<script>
    var lis = document.getElementById("list").
        getElementsByTagName("li");
    for(var i = 0, len = lis.length; i < len; i++) {
        /*
        <i>前端开发</i>
        <b>服务器端开发</b>
        UI设计
        */
        console.log(lis[i].innerHTML);
        lis[i].innerHTML = lis[i].innerHTML + '程序';
    }
</script>
```
**(2) className属性的应用**
语法: ele.className
功能: 返回ele元素的class属性
<font color=pink size=3>
ele.className重新设置时,是重新设置类，替换元素本身的class
</font>
eg:
```javascript {.line-numbers}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Document</title>
    <style>
        .on{
            border-bottom: 1px solid #0f0;
        }
        .current{
            background: #ccc;
            color: #f00;
        }
    </style>
</head>
<body>
    <div class="box" id="box">
    <!-- <div class="box" id="box" style="color:#0f0"> -->
        元素
    </div>
    <ul id="list">
        <li><i>前端开发</i></li>
        <li class="on"><b>服务器端开发</b></li>
        <li>UI设计</li>
    </ul>
    <ol>
        <li>javascript原生</li>
        <li>javascript框架</li>
    </ol>
    <script>
        var lis = document.getElementById("list").
            getElementsByTagName("li");
        for(var i = 0, len = lis.length; i < len; i++) {
            /*
            <i>前端开发</i>
            <b>服务器端开发</b>
            UI设计
            */
            console.log(lis[i].innerHTML);
            lis[i].innerHTML = lis[i].innerHTML + '程序';
            //覆盖，而不是class="on current"
            lis[1].className = "current"; 
        }
    </script>
</body>
</html>
```
___
##### 4. DOM属性设置与获取
获取DOM元素属性或添加属性
**(1) 获取属性**
语法: ele.getAttribute("attribute")
功能: 获取ele元素的attribute属性
<font color=pink size=3>
说明:
1、ele是要操作的dom对象
2、 attribute是要获取的html属性
</font>
**(2) 设置属性**
Sets the value of an attribute on the specified element. If the attribute already exists, the value is updated; otherwise a new attribute is added with the specified name and value.
To get the current value of an attribute, use getAttribute(); to remove an attribute, call removeAttribute().
语法: ele.setAttribute("attribute:, value)
功能: 在ele元素上设置属性
<font color=pink size=3>
说明:
1、 ele是要操作的dom对象
2、 attribute为要设置的属性名称
3、 value为设置的attribute属性的值
</font>
**(3) 删除属性**
语法: ele.removeAttribute("attribute")
功能: 删除ele上的attribute属性
<font color=pink size=3>
说明: 
1、ele是要操作的dom对象
2、 attribute是要删除的属性名称
</font>
eg:
```javascript {.line-numbers}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Document</title>
</head>
<body>
    <p id="text" class="text" align="center" data-type="title">文本</p>
   <input id="username" type="text" name="user" value="User" validate="true">
   <script>
        var p = document.getElementById("text");
//text 本身p标签存在的属性可以获取到, data-type是我们自定义的属性
// data-type不能通过下面这种方式获取到，是未定义的属性，可以借助getAttribute()
        console.log(p.id); //p.getAttribute("id")
        console.log(p.getAttribute("class")); // p.className
        console.log(p.getAttribute("data-type"));
        var user = document.getElementById("username");
        console.log(user.validate); //undefined

        //给p设置一个data-color的属性
        p.setAttribute("data-color", "red");
        //给input设置一个isRead的属性
        user.setAttribute("isRead", "false");
        //删除p上的align属性
        p.removeAttribute("align");
    </script>
</body>
</html>
```
___
#### 2. DOM事件
**参考文档:** [Events](https://developer.mozilla.org/en-US/docs/Web/Events)

##### 1. HTML事件
> 什么是事件?
事件就是文档或浏览器窗口中发生的一些特定的交互瞬间

事件的绑定方式写法上共有三种: 
> HTML事件
直接在HTML元素标签内添加事件，执行脚本
有窗口事件、表单事件、鼠标事件、多媒体事件、
键盘事件、其他事件等
语法: <tag 事件="执行脚本"></tag>
功能: 在HTML元素上绑定的事件
说明: 执行脚本可以是一个函数的调用
eg:
```javascript {.line-numbers}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Document</title>
    <style>
    #btn{
        width: 140px;
        height: 30px;
        line-height: 30px;
        background: #00f;
        color: #fff;
        font-size: 14px;
        text-align: center;
        border-radius: 10p;
        /* cursor属性定义个鼠标指针放在一个元素边界范围内时所用的光标形状 */
        cursor: pointer;
        margin-top: 30px;
    }
    </style>
</head>
<body>
    <!-- 鼠标事件 onclick: 鼠标点击时触发 -->
    <input type="button" value="弹出" onclick="alert('我是按钮')">
   <!-- onmouseover: 鼠标滑过时触发 -->
   <!-- 鼠标滑过时调用mouseoverFn()函数 -->
    <div id="btn" onmouseover="mouseoverFn(this, '#f00')" onmouseout="mouseoutFn(this, '#00f')">开始</div>
    <script>
    //第一种绑定事件方法
    function mouseoverFn(btn, bgColor) {
        // 鼠标滑过按钮时，按钮的背景变为红色
        //console.log(btn); 
        btn.style.background = bgColor;
    }
    function mouseoutFn(btn, bgColor) {
        btn.style.background = bgColor;
    }
    </script>
</body>
</html>
```
___
##### 2. DOM0级事件
>绑定事件的方法:
(1) 通过DOM获取HTML元素
(2) (获取HTML元素).事件=执行脚本
语法: ele.事件 = 执行脚本
功能: 在DOM对象上绑定事件
<font color=pink size=3>
说明:  执行脚本可以是一个匿名函数，也可以是一个函数的调用
</font>
```javascript {.line-numbers}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Document</title>
    <style>
    .lock{
        width: 140px;
        height: 30px;
        line-height: 30px;
        background: #00f;
        color: #fff;
        font-size: 14px;
        text-align: center;
        border-radius: 10px;
        /* cursor属性定义个鼠标指针放在一个元素边界范围内时所用的光标形状 */
        cursor: pointer;
        margin-top: 30px;
    }
    .unlock{
        width: 140px;
        height: 30px;
        line-height: 30px;
        background: #666;
        color: #ccc;
        font-size: 14px;
        text-align: center;
        border-radius: 10px;
        /* cursor属性定义个鼠标指针放在一个元素边界范围内时所用的光标形状 */
        cursor: pointer;
        margin-top: 30px;
    }
    </style>
</head>
<body>
    <div class="lock" id="btn">锁定</div>
    <script>

    //第二种: 使用元素的事件句柄来绑定事件
    //获取按钮
    var btn = document.getElementById("btn");
    //给按钮绑定事件
    btn.onclick = function() {
        // this执行的是绑定函数的元素的对象
        if(this.className == "lock") {
            this.className = "unlock";
            this.innerHTML = "解锁";
        } else {
            this.className = "lock";
            this.innerHTML = "锁定";
        }
        // console.log(this);
    }

    // 第三种: 使用推荐的标准模式
    // document.getElementById("btn").addEventListener("click", function() {
    //     if(this.className == "lock") {
    //         this.className = "unlock";
    //         this.innerHTML = "解锁";
    //     } else {
    //         this.className = "lock";
    //         this.innerHTML = "锁定";
    //     }
    // });
    </script>
</body>
</html>
```
<font color=pink size=3>

我们看看EventTarget的方法addEventListener()方法介绍:
The EventTarget method addEventListener() sets up a function that will be called whenever the specified event is delivered to the target. Common targets are Element, Document, and Window, but the target may be any object that supports events (such as XMLHttpRequest).
addEventListener() works by adding a function or an object that implements EventListener to the list of event listeners for the specified event type on the EventTarget on which it's called.
可以看到，这个方法可以将多个方法或对象放入一个事件监听者队列，事件发生，逐个
调用，具体顺序得看实现
绑定事件的方法有三种:
(1) 直接绑定在dom上
<div onlick="fun()">click</div>
(2) 使用元素的事件句柄(属性)
document.getElementById("xxx").onclick = function(){//xxx};
(3) 使用标准的推荐模式
document.getElementById("xxx").addEventListener("click", function(){//xxx});
(1)、(2)是同一种方式，当同时使用时，第二个会把第一个给覆盖掉，addEventListener会绑定多个事件程序，依次执行。
小结:
不建议使用HTML事件原因:
1. 多元素绑定相同事件时，效率低
2. 不建议在HTML元素中写JavaScript代码
</font>

____
##### 3. 事件类型
参考文档:  [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)
onload: 页面加载时触发
The MouseEvent interface represents events that occur due to the user interacting with a pointing device (such as a mouse). Common events using this interface include click, dblclick, mouseup, mousedown.(常见的鼠标事件包括单击onclik、双击ondblclick、滑轮朝上、滑轮朝下滑)

MouseEvent derives from UIEvent, which in turn derives from Event. Though the MouseEvent.initMouseEvent() method is kept for backward compatibility, creating of a MouseEvent object should be done using the MouseEvent() constructor.(Event->UIEvent->MouseEvent,创建MouseEvent应该使用MouseEvent()构造器创建)

Several more specific events are based on MouseEvent, including WheelEvent and DragEvent.
eg:
```javascript {.line-numbers}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Document</title>
    <script>
        //onload 页面加载时执行
        window.onload = function() {
            // 获取box
            var box = document.getElementById("box");
            var clicked = function() {
                alert('我被点击了');
            }
            box.onclick = clicked;
        }
    </script>
</head>
<body>
    <div id="box">这是一个DIV</div>
</body>
</html>
```
onfocus: 获取焦点时触发
onfocus事件用于: 
-input标签type为text、password
-textarea标签
onblur: 失去焦点时触发
eg:
```javascript {.line-numbers}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Document</title>
    <style>
        .box{
            padding: 50px;
        }
        .left, .tip{
            float: left;
        }
        .left{
            margin-right: 10px;
        }
        .tip{
            display: none;
            font-size: 14px;
        }
    </style>
    <script>
        window.onload = function(){
            //获取文本框和提示框
            var phone = document.getElementById("phone"),
                tip = document.getElementById("tip");
            // 给文本框绑定激活事件
            phone.onfocus = function() {
                //显示tip
                tip.style.display = "block";
            }
            // 给文本框绑定失去焦点的事件, 也可以是键盘事件，回车比如等等
            // 可以查看KeyboardEvent.keyCode文档
            phone.onblur = function() {
                // 获取文本框的值, value用于获取表单元素的值
                var phoneVal = this.value;
                // 判断手机号码是否是11位的数字 简单测试，不用正则表达式
                if(phoneVal.length == 11 && isNaN(phoneVal) == false) {
                    // 显示正确图案
                    tip.innerHTML = '<img src="img/right.png">';
                } else {
                    // 显示错误图案
                    tip.innerHTML = '<img src="img/error.png">';
                }
            }
        }
    </script>
</head>
<body>
    <div class="box">
        <div class="left">
            <input type="text" id="phone" placeholder="请输入手机号码">
        </div>
        <div class="tip" id="tip">
            请输入有效手机号码
        </div>
    </div>
</body>
</html>
```
-onchange: 域的内容改变时发生
eg:
```javascript {.line-numbers}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Document</title>
    <script>
        // 页面加载
        window.onload = init;

        //初始化
        function init() {
            //获取下拉菜单
            var menu = document.getElementById("menu");
            //给菜单绑定change事件, 一般作用于select或checkbox或radio
            // menu.onchange = function(event) {
            //     var bgcolor = event.target.value;
            //     console.log(bgcolor);
            //     //console.log(event.target === this); true
            // }
            menu.onchange = function(event) {
                var bgcolor = this.value;
                /*
                HTMLSelectElement.options是一个HTMLOptionsCollection，
                代表被这个select元素包含的所有option的集合
                HTMLSelectElement.selectedIndex是选中的元素的索引
                因此我们可以通过下面来访问
                var bgcolor = menu.options[menu.selectedIndex].value;
                */
                // 设置body的背景色
                if(bgcolor == "") {
                    document.body.style.background = "#fff";
                } else {
                    document.body.style.background = bgcolor;
                }
            }
        }
    </script>
</head>
<body>
    <div class="box">
        请选择你喜欢的背景色:
        <select name="" id="menu">
            <option value="">请选择</option>
            <option value="#f00">红色</option>
            <option value="#0f0">绿色</option>
            <option value="#00f">蓝色</option>
            <option value="#ff0">黄色</option>
            <option value="#ccc">灰色</option>
        </select>
    </div>
</body>
</html>
```
**鼠标事件:**
-onsubmit: 表单中的确认按钮被点击时发生
-onmousedown: 鼠标按钮在元素上按下时触发
-onmousemove: 在鼠标指针移动时发生
-onmouseup: 在元素上松开鼠标按钮时触发
-onresize: 当调整浏览器窗口的大小时触发
-onscroll: 拖动滚动条滚动时触发
eg:
```javascript {.line-numbers}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Document</title>
    <style>
        body {
            height: 1000px;
        }
        .box{
            width: 200px;
            height: 200px;
            background: #f00;
            overflow: auto;
        }
    </style>>
</head>
<body>
    <div id="box" class="box">
        <p>拖动</p>
        <p>拖动</p>
        <p>拖动</p>
        <p>拖动</p>
        <p>拖动</p>
        <p>拖动</p>
        <p>拖动</p>
        <p>拖动</p>
        <p>拖动</p>
        <p>拖动</p>
    </div>
    <script>
        var box = document.getElementById("box");
        // 绑定按下事件
        box.onmousedown = function() {
            console.log("pushdown");
        }

        //移动的事件
        box.onmousemove = function() {
            console.log("move");
        }

        //绑定松开的事件
        box.onmouseup = function() {
            console.log("loose");
        }

        //绑定点击的事件 是由按下和松开事件组成的
        box.onclick = function() {
            console.log("click");
        }

        // 浏览器窗口尺寸发生改变
        window.onresize = function() {
            console.log("change size");
        }

        //拖动滚动条
        window.onscroll = function() {
            console.log("scroll");
        }

        box.onscroll = function() {
            console.log("box scroll");
        }
    </script>
</body>
</html>
```
___

**键盘事件与keyCode属性**
参考文档: [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
常见的键盘事件:
-onkeydown: 在用户按下一个键盘按键时发生
-onkeypress: 在键盘按键被按下并释放一个键时发生
-onkeyip: 在键盘按键被松开时发生
keyCode: 是KeyboardEvent的属性，已经被淘汰了，不建议使用,可以使用KeyboardEvent.key来代替  返回onkeypress、onkeydown或onkeyup事件
触发的键的值的字符代码，或键的代码(各个浏览器实现不一样)
eg:
```javascript {.line-numbers}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        .text span{font-weight: bold; color: #f00;}
        em{font-style: normal;}
    </style>
</head>
<body>
    <div>
        <p class="text">你还可以输入<span><em class="count">30</em>/30</span></p>
        <div class="input">
            <textarea name="" id="text" cols="70" rows="4">
            </textarea>
        </div>
    </div>
    <script>
        //获取文本框
        var text = document.getElementById("text");
        // 绑定键盘事件
        var total = 30;
        var allowText = document.querySelector(".count");
        document.onkeyup = function() {
            // 获取文本框值的长度
            var len = text.value.trim().length;
            var allow = total - len;
            allowText.innerHTML = allow;
            console.log(allow);
        }
    </script>
</body>
</html>
```
___
### 6. javascript BOM对象
**什么是bom?**
>BOM(browser object model)浏览器对象模型
DOM(文档对象模型)是HTML和XML的应用程序接口(API)
BOM主要处理浏览器窗口和框架，不过通常浏览器特定的JS扩展都被看做BOM的一部分
>BOM对象有:
>window、navigator、screen、history、location、document、event
#### 1. window对象
##### 1. window对象概述
参考文档: [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/Window)
window是浏览器的一个实例，表示浏览器窗口，在浏览器中，window对象有双重角色，它既是通过JavaScript访问浏览器窗口的一个接口,又是ECMAScript规定的Global对象
所有JS全局对象、函数以及变量均自动成为window对象的成员
(document也是window的属性之一)
eg:
```javascript {.line-numbers}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <script>
        var age = 15; //相当于window.age = 15
        function sayAge() {
            alert('我' + age);
        }
        sayAge();
        //声明一个全局变量
        window.username = "marry"; //var username = "marry";
        //声明一个全局方法
        window.sayName = function() {
            alert("我是" + this.username);
        }
        window.sayName();
        window.sayAge();
    </script>
</body>
</html>
```
___
##### 2. window对象的常见方法
**alert()**
语法: window.alert("content")
功能: 显示带有一段消息和一个确认按钮的警告框
**confirm()**
语法: window.confirm("message")
功能: 显示一个带有指定消息和OK及取消按钮的对话框
返回值: 如果用户点击确定按钮，返回true,点击取消按钮,返回false
**prompt()**
语法: window.prompt("text, defaultText")
<font color=pink size=3>
参数说明:
text: 要在对话框中显示的纯文本(而不是HTML格式的文本)
defaultText: 默认的输入文本,否则返回输入字段当前显示的文本
返回值: 如果用户单击提示框的取消按钮，则返回null
</font>
eg:
```javascript {.line-numbers}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div id="box">
        <span>iphone6s</span>
        <input type="button" value="删除" id="btn">
    </div>
    <script>
        //confirm()
        //获取按钮，绑定事件
        var btn = document.getElementById("btn");
        btn.onclick = function() {
            //弹出确认对话框
            var result = window.confirm("你确定要删除吗?");
            if(result){
                // 直接移除
                // var box = document.getElementById("box");
                // var rmspan = document.querySelector("span");
                // var input = document.getElementById("btn");
                // box.removeChild(rmspan);
                // box.removeChild(input);

                //隐藏起来
                document.getElementById("box").style.display = "none";
            }
        }

        //弹出输入框
        var message = prompt("请你输入你的星座", "天蝎座");
        console.log(message);
    </script>
</body>
</html>
```
**open()**
语法: window.open(pageURL, name, parameters)
功能: 打开一个新的浏览器窗口或查找一个已命名的窗口
<font color=pink size=3>
参数说明:
pageURL: 子窗口路径
name: 子窗口句柄(name声明了新窗口的名称，方便后期通过name对子窗口进行引用)
parameters: 窗口参数(各参数用逗号分隔)
详见: [parameters](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#Window_features)
</font>
eg:
```javascript {.line-numbers}
<script>
    window.onload = function() {
        //打开子窗口，显示newwindow.html
        window.open("newwindow.html","newwindow");
    }
</script>
```
**close()**
语法: window.close()
功能: 关闭浏览器窗口
___
##### 3. window对象方法--定时器
参考文档: [Timer](https://www.red-gate.com/simple-talk/dotnet/asp-net/javascript-single-threaded/)
有一段话比较重要:
setTimeout(callback, time)和setInterval(callback, time):
These functions are not reacting to changes, but just running our code. One of their main purpose is to provide us the means of breaking synchronous execution into asynchronous parts. It is important to remember that these functions don’t guarantee that callback will be executed after the amount of time that you specify. They do guarantee that callback will be added to the Event handlers queue, but, as we know, it could already have handlers waiting for execution. So, “time” argument should be treated as “not earlier than, but after the specified time”.
也就是说它们并不是真正的异步
setTimeout()的定义可以理解为是: 在指定时间内，将任务放入事件队列，等待js引擎空闲后执行
<font color=pink size=3>
注: javascript是单线程语言，单线程就是所执行的代码必须按照顺序，同一时间只能做一件事。
作为浏览器脚本语言，JS的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JS脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JS单线程的本质。
同时，JS引擎是单线程的，但是浏览器却可以是多线程的，定时器计时、网络请求、浏览器渲染等等都是由不同的线程去完成的
</font>
可以对比下面的两个例子，理解setTimeout()的伪异步:
eg:
```javascript {.line-numbers}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div id="results">results</div>
    <script>
    var results = document.getElementById("results");
    function appendResult(result) {
        var div = document.createElement('div');
        div.innerText = result;
        results.appendChild(div);
    }

    // function calculatePi(numberOfIterations) {
    //     var pi = 0,
    //     n = 1;
    //     for (var i = 1; i < numberOfIterations; i++) {
    //         console.log("我被调用了");
    //         appendResult(pi);
    //         pi = pi + (4 / n) - (4 / (n + 2));
    //         n += 4
    //     }
    
    //     return pi;
    // };
 
    function calculatePi(pi, n) {;
        for (; ; n += 4) {
            pi = pi + (4 / n) - (4 / (n + 2));
            if ((n - 1) % 20000000 == 0) {
                console.log("我被调用了");
                appendResult(pi);
                setTimeout(function () {
                    calculatePi(pi, n + 4);
                });
                return;
            }
        }
    }
 
calculatePi(0, 1);
</script>
</body>
</html>
```
可以看到未注释部分执行后，浏览器及时显示接近PI的值，浏览器定时触发器不断将新的任务加入到js引擎线程队列中，js引擎执行完成后，浏览器GUI渲染线程开始渲染，显示PI值，之后不断重复。
当使用注释部分代码时，因为js引擎线程一直不为空，GUI渲染线程不能执行(他们是互斥的)，所以页面一直是空白的
**(1) 超时调用**
**setTimeout()**
语法: setTimeout(function[, delay, param1, param2, ...])
      setTimeout(code[,delay])
功能: 在指定的毫秒数后调用函数或计算表达式
参数说明:
1、 function 是你想要在delay毫秒之后执行的函数
2、 delay 延迟的毫秒数，函数的调用会在该延迟之后发生
3、 param1, ..., paramN 附加参数，一旦定时器到期，它们会作为参数传递给function
4、code 这是一个替代语法，可以使用字符串代替function,不推荐，有安全风险
返回值: timeoutID是一个正整数，表示定时的编号，可以传递给clearTimeout()来取消该定时。由于setTimeout()和setInterval()共用一个编号池，技术上，可以互换，但是为了避免混淆，不要混用取消定时函数
**clearTimeout**
语法: clearTimeout(id_of_settimeout)
功能: 取消由setTimeout()方法设置的timeout
参数说明:
1、 id_of_settimeout: 有setTimeout()返回的ID值，该值标识要取消延迟执行代码块
eg:
```javascript {.line-numbers}
<script>
//字符串方式-不推荐
// window.setTimeout("alert('hello')", 4000);

//匿名函数调用
// window.setTimeout(function() {
//     alert("hello");
// }, 4000);

//自定义函数
var fnCall = function() {
    alert("world");
}
var timerId = setTimeout(fnCall, 4000);
clearTimeout(timerId);
    
</script>
```
**setInterval(code, millisec)和clearInterval()**
setInterval()每隔指定的时间执行一次代码，clearInterval()
取消计时，请自行参考
eg:
<script>
    var timerId = setInterval(function() {
        console.log("你好");
    }, 1000);

    //10秒之后停止打印
    setTimeout(function() {
        clearInterval(timerId);
    }, 10000);
</script>
___
#### 2. location对象
##### 1. location对象概述
参考文档: [location](https://developer.mozilla.org/en-US/docs/Web/API/Location)
The Location interface represents the location (URL) of the object it is linked to. Changes done on it are reflected on the object it relates to. Both the Document and Window interface have such a linked Location, accessible via Document.location and Window.location respectively.
location对象提供了与当前窗口中加载的文档有关的信息，还提供了一些导航的功能，它既是window对象的属性，也是document对象的属性
___
##### 2. location对象的常用属性
**location.href**
语法: location.href
功能: 返回当前加载页面的完整URL
说明: location.href和window.location.href一样
**location.hash**
语法: location.hash
功能: 返回URL中的hash(#号后跟零或多个字符)，如果不包含则返回空字符串
```javascript {.line-numbers}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        .box1{height: 400px; background: #ccc;}
        .box2{height: 600px; background: #666;}
    </style>
</head>
<body>
    <div class="box1" id="top"></div>
    <div class="box2"></div>
    <input type="button" id="btn" value="返回顶部">
    <script>
        console.log(window.location.href);
        console.log(location.hash);
        var btn = document.getElementById("btn");
        btn.onclick = function() {
            //file:///C:/Users/Clarence/Desktop/JavaScriptLearningNotes/7.javascriptBOM%E5%AF%B9%E8%B1%A1/index6.html#
            //点击按钮返回顶部 改变锚点为"#top"
            location.hash = "#top";
        }
    </script>
</body>
</html>
```
**location.host**
语法: location.host
功能: 返回服务器名称和端口号(如果有)
**location.hostname**
语法: location.hostname
功能: 返回不带端口号的服务器名称
**location.pathname**
语法: location.pathname
功能: 返回URL中的目录和(或)文件名
**location.port**
语法: location.port
功能: 返回URL中指定的端口号，如果没有，返回空字符串
**location.protocol**
功能: 返回页面使用的协议
**location.search**
语法: location.search
功能: 返回URL的查询字符串。这个字符串以问号开头
____
##### 3. location对象的运用
**(1) 掌握位置操作**
改变浏览器位置的方法: location.href属性
location对象其他属性也可改变URL: location.hash、location.search
**location.replace()**
语法: location.replace(url)
功能: 重新定向URL
说明: 使用location.replace不会在历史记录中生成新纪录(当前页面将不会保存在会话历史中，也就是不能点击浏览器回退按钮回退到原来页面)
eg:
```javascript {.line-numbers}
<!-- index7.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <script>
        setTimeout(function() {
            // location.href = "index6.html";
            //window.location = "index6.html";
            location.replace("index6.html"); //url不会添加到栈中，无回退到原始页面按钮
        }, 1000);
    </script>
</body>
</html>
```
**location.reload(forcedReload)**
语法: location.reload()
功能: 重新加载当前显示的页面
<font color=pink size=3> 
说明:
(1) location.reload()有可能从缓存中加载,无参默认是false
(2) location.reload(true)从服务器重新加载
</font>
___
#### 3. history对象
##### 1. history对象概述
参考文档: [history](https://developer.mozilla.org/en-US/docs/Web/API/Window/history)
The Window.history read-only property returns a reference to the History object, which provides an interface for manipulating the browser session history (pages visited in the tab or frame that the current page is loaded in).
注意window.history和History区别

See Manipulating the browser history for examples and details. In particular, that article explains security features of the pushState() and replaceState() methods that you should be aware of before using them
history对象保存了用户在浏览器中访问页面的历史记录
___
##### 2. history对象方法
**history.back()**
语法: history.back()
功能: 回到历史记录的上一步
说明: 相当于使用了history.go(-1)
eg: 我们打开index10.html页面,点击index11.html链接，然后点击后退按钮回到index10页面
```javascript {.line-numbers}
<!DOCTYPE html>
<html lang="en">、
<!-- index10.html -->
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div class="box">
        请输入搜索关键字
        <input type="text" placeholder="请输入搜索关键字" id="key"> 
        <input type="button" value="搜索" id="search">
    </div>
    <a href="#" id="go">跳转</a>
    <a href="index11.html">index11.html</a>
    <script>

        /*
        注； encodeURIComponent()函数与encodeURI()函数的区别之处，
        前者假定它的参数是URI的一部分，因此encodeURIComponent函数将
        转义用于分割URI各个部分的标点符号
        */
        // 给按钮绑定事件
        document.getElementById("search").onclick = function() {
            // 获取搜索关键字并对它进行编码
            var key = encodeURIComponent(document.getElementById("key").value);
            //跳转到指定页面
            location.href = "index9.html?search_key=" + key;
        }
        var sea = "搜索";
        document.getElementById("go").href = "index.html?key=" + encodeURI(sea);
        console.log(document.getElementById("go").href);
    </script>
</body>

</html>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <p>这是index11.html</p>
    <!-- 我们可以通过浏览器后退按钮，返回到index10.html页面 -->
    <p><input type="button" value="后退" id="btn"></p>
    <script>
        var btn = document.getElementById("btn");
        //点击btn按钮时回到历史记录的上一步
        btn.onclick = function() {
            history.back(); //history.go(-1)
        }
    </script>
</body>
</html>
```
**history.forward()**
语法: location.forward()
功能: 回到历史记录的下一步
说明: 相当于使用了history.go(1)
**history.go()**
语法: history.go(-n)
功能: 回到历史记录的前n步
语法: history.go(n)
功能: 回到历史记录的后n步
___
#### 4. navigator对象
##### 1. navigator对象概述
参考文档: [navigator](https://developer.mozilla.org/en-US/docs/Web/API/Window/navigator)
The Window.navigator read-only property returns a reference to the Navigator object, which can be queried for information about the application running the script.
Navigator对象属性
appCodeName: 返回浏览器的代码名
appName: 返回浏览器的名称
appVersion: 返回浏览器的平台和版本信息
cookieEnabled: 返回指明浏览器中是否启用cookie的布尔值
platform: 返回运行浏览器的操作系统平台
userAgent: 返回由客户端发送服务器的user-agent头部的值
___
##### 2. window.navigator的使用
**(1) window.navigator.userAgent**
userAgent: 用来识别浏览器名称、版本、引擎以及操作系统等信息的内容
eg:
```javascript {.line-numbers}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <script>
        // 检测浏览器类型
        function getBrowser() {
            // 获取userAgent属性
            var  explorer = navigator.userAgent.toLowerCase()
                ,browser;
            // indexOf()返回指定的字符串在字符串中首次出现的位置，没有出现过，
            // 返回-1
            if(explorer.indexOf("msie") > -1) {
                browser = "IE";
            } else if(explorer.indexOf("chrome") > -1) {
                browser = "chrome";
            } else if(explorer.indexOf("opera") > -1) {
                browser = "opera";
            } else if(explorer.indexOf("safari") > -1){
                browser = "safari";
            }
            return browser;
        }
        var explorer = getBrowser();
        console.log("你当前使用的是: " + explorer);
    </script>
</body>
</html>
```
___
#### 5. screen
##### 1. screen对象概述
参考文献:
[screen](https://developer.mozilla.org/en-US/docs/Web/API/Window/screen) [Screen](https://developer.mozilla.org/en-US/docs/Web/API/Screen)
Returns a reference to the screen object associated with the window. The screen object, implementing the Screen interface, is a special object for inspecting properties of the screen on which the current window is being rendered
screen对象包含有关客户端显示屏幕的信息
主要属性:
availHeight: 返回屏幕的高度(不包括windows任务栏)
availWidth: 返回屏幕的宽度
colorDepth: 返回目标设备或缓冲器上的调色板的比特深度
height: 返回屏幕的总高度
pixulDepth: 返回屏幕的颜色分辨率(每像素的位数)
width: 返回屏幕的总宽度
___
##### 2. screen对象的使用

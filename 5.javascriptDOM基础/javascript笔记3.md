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
##### 3. 事件类型
onload: 页面加载时触发
The MouseEvent interface represents events that occur due to the user interacting with a pointing device (such as a mouse). Common events using this interface include click, dblclick, mouseup, mousedown.(常见的鼠标事件
包括单击onclik、双击ondblclick、滑轮朝上、滑轮朝下滑)

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
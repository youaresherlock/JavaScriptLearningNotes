>适合有其他语言编程经验的人快速入门JS(全部阅读大概需要一个小时)
___
>视频教程及ppt代码地址[github](https://github.com/youaresherlock/JavaScriptLearningNotes)
___
### 2. JavaScript的流程控制语句
#### 1. js的分支语句
##### 1. if语句
语法一:condition为true则执行
```javascript {.line-numbers}
    if(condition){
        statement1;
    }
```
语法二: 
```javascript {.line-numbers}
    if(condition){
        statement1;
    } else {
        statement2;
    }
```
语法三:
```javascript {.line-numbers}
    if(condition){
        statement1;
    } else if {
        statement2;
    } ... else {
        statementn;
    }
```
eg:
我们弹出一个输入框让用户设置6位密码，长度不够提示，长度够继续判断是否是非数字
我们需要字符串的length属性
语法: string.length
功能: 获取string字符串长度
返回值: number
```javascript {.line-numbers} 
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Document</title>
        <script src=""></script>
    </head>
    <body>
        <script>
            var password = prompt("请输入你的密码");
            if(password.length != 6) {
                alert("请输入6位的数字密码");
            } else {
                //如果是非数字
                if(isNaN(password)) {
                    alert("密码必须要是数字");
                } else {
                    alert("密码设置正确");
                }
            }
        </script>
    </body>
</html>
```
___
##### 2. switch语句
用于多条件判断，多个判断可以用switch
语法:
```javascript {.line-numbers}
switch(expression) {
    case value1: statement
    break;
    case value2: statement
    break;
    // 还可以有很多case
    default: statement //所有case不满足执行默认
}
```
获取星期
语法: new Date().getDay()
功能: 获取星期
返回值: number(0-6)
浏览器console中eg:
```
>new Date()
<Thu Dec 27 2018 14:49:05 GMT+0800 (中国标准时间)
>new Date().getDay()
<4
```
switch使用的eg:
```javascript {.line-numbers} 
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>switch输出星期</title>
    </head>
    <body>
        <script>
          var week = new Date().getDay();
          // console.log(week); //返回4
          switch(week){
              case 0: 
              weekstr = "日";
              break;
              case 1: 
              weekstr = "一";
              break;
              case 2:
              weekstr = "二";
              break;
              case 3:
              weekstr = "三";
              break;
              case 4: 
              weekstr = "四";
              break;
              case 5:
              weekstr = "五";
              break;
              default:
              weekstr = "六";
          }
          document.write("今天是星期" + weekstr);
        </script>
    </body>
</html>
```
___
#### 2. js的循环语句
JavaScript中的循环分成四种for、for-in、while、do...while四种
##### 1.for循环
语法: 
```javascript {.line-numbers}
    for(语句1; 语句2; 语句3) {
        被执行的代码块;
    }
```
语句1: 在循环(代码块)开始前执行
语句2: 定义运行循环(代码块)的条件
语句3: 在循环(代码块)已被执行之后执行

循环之间的嵌套
当循环与循环发生嵌套时遵循下列规则:
1.外层为假时内层不执行;
2.先执行外层再执行内层，直至内层的条件为假时再返回外层去执行
eg:
```javascript {.line-numbers}
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>for</title>
    </head>
    <body>
        <script>
          // 循环的初始值
          for(var i = 1; i < 101; i++){
              document.write(i + "<br>");
          }

          //循环嵌套
          for(var j = 1; j <=3; j++) {
              document.write(j + "<br>"); // 1 2 3
              for(var k = 1; k <= 5; k++) {
                  document.write(k + "<br>"); // 1 2 3 4 5
              }
          }

          //while循环
          var l = 1;
          while(l <= 100) {
              document.write(l + "<br>");
              i += 1; // i ++
          }

          //do-while循环
          //输出1 - 10之间所有偶数
          var p = 18;
          do {
              if(p % 2 == 0) {
                  console.log(p);
              }
              p++;
          }while(p <= 10);

        </script>
    </body>
</html>
```
___
##### 2. while循环
语法:
```javascript {.line-numbers}
while(条件) {
    需要执行的代码;
}
```
do-while语句
语法:
```javascript {.line-numbers}
do{
    需要执行的代码;
}while(条件)
```
<font color=pink size=3>
说明: 
这种语法的循环至少要被执行一次
</font>

for与while的区别:
for 适合已经循环次数的循环体
while 适合未知循环次数的循环体
___
##### 3. break和continue语句
break: 立即退出循环
continue: 结束本次循环，继续开始下一次
____
### 3. js函数
#### 1. 函数的定义和调用
函数的作用:
    通过函数可以封装任意多条语句，而且可以在任何地方、任何时候调用执行
函数的定义:
    函数使用function声明，后跟一组参数以及函数体，语法如下:
```javascript {.line-numbers}
function functionName([arg0, arg1,...argn]) {
    statements
}
```
<font color=pink size=3>
说明:
1、functionName是要定义的函数名，属于标识符
2、 []中的arg0,arg1,...argn为函数的参数
3、 []说明里面的内容不是必须的， 它不是语法
</font>

eg:
```javascript {.line-numbers}
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>for</title>
    </head>
    <body>
        <script>
        // 声明一个函数
        function myFun() {
            alert("我是一个函数");
        }
        //函数的调用
        myFun();

        // 声明一个带有参数的函数
        function add(num1, num2) {
            var sum = num1 + num2;
            alert(num1 + '和' + num2 + '的和是' + sum);
        }
        add(3, 5); 

        // 函数的返回值
        function sub(num1, num2) {
            var result = num1 - num2;
            return result;
        }
        console.log(add(3, 5)); //undefined 证明默认返回值是它
        console.log(sub(3, 2)); // 1

        function myFunction(arg) {
            //如果arg是非数字，不做任何操作,否则返回arg的2倍
            if(isNaN(arg)) return;
            return arg * 2;
        }
        console.log(myFunction("abc")); //undefined
        </script>
    </body>
</html>
```
___
#### 2. 函数的返回值
函数的返回值
任何函数通过return语句，后面跟着返回的值来实现返回值
<font color=pink size=3>
说明:
1、函数会在执行完return语句之后停止并立即退出
2、return语句也可以不带有任何返回值，用于提前停止函数执行又
不需要返回值的情况
</font>
eg: 同上
___
#### 3.arguments对象
##### 1. arguments对象
参考文档:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
Function对象的arguments属性:
```
The function.arguments property refers to an an array-like object corresponding to the arguments passed to a function. Use the simple variable arguments instead.
```
可以看到function.arguments属性已经过时了，建议使用arguments替代
arguments
```
    arguments is an Array-like object accessible inside 
functions that contains the values of the arguments passed to that function.
```
ECMAScript中的参数在内部用一个数组来表示,在函数体内通过arguments
对象来访问这个数组参数.
<font color=pink size=3>
说明:
1、arguments对象只是与数组类似，并不是Array的实例
2、 []语法访问它的每一个元素
3、length属性确定传递参数的个数
</font>
eg:
```javascript {.line-numbers}
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>arguments</title>
    </head>
    <body>
        <script>
            //eg1:
            // function inner(num1, num2) {
            //     console.log(num2); 
            // }
            // 只传递一个值，num2是undefined,注意与其他语言的区别
            // inner(10); //undefined未定义的

            //eg1:
            function inner() {
                //arguments
                //非严格模式可以对argument[0]等内容进行设置重新赋值
                console.log(typeof arguments); //'object'
                console.log(arguments.length); //2
                console.log(arguments[0]); //10
                console.log(arguments[1]); // 5
                console.log(arguments[2]); //undefined
            }
            inner(10, 5);

            //eg: arguments对象使用案例，对未知个参数求平均值
            //求任意一组数的平均值
            function getAvg() {
                //对所有参数进行求和
                var len = arguments.length;
                var sum = 0;
                for(var i = 0; i < len; i++) {
                    sum += arguments[i];
                }
                console.log(sum/len);
                return sum / len;
            }
            getAvg(5, 66, 45, 32, 88);
        </script>
    </body>
</html>
```
___
##### 2.严格模式
除了正常运行模式,ECMAscript5添加了第二种运行模式:"严格模式"(strict mode).顾名思义，这种模式使得JS在更严格的条件下运行
进入"严格模式"的标志是下面这行语句:
`
"use strict";
`
老版本的浏览器会把它当做一行普通字符串，加以忽略
可以针对脚本或单个函数运用
针对函数eg:
<font color=red size=3>
将"use strict"放在函数体的第一行，则整个函数以"严格模式"运行。
</font>
```javascript {.line-numbers}
　　function strict(){
　　　　"use strict";
　　　　return "这是严格模式。";
　　}
　　function notStrict() {
　　　　return "这是正常模式。";
　　}
```
___
### 4. js的内置对象
#### 1. 数组的创建和简单使用
参考: 
https://developer.mozilla.org/en-US/docs/Web/JavaScript
中的Built-in objects
取出典型的四种介绍Array、String、Math、Date
ECMAScript中Array数组
数组主要是用来存储一组数据的
##### 1.如何创建数组
文档:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/
创建数组的基本方式有两种:
1、使用Array构造函数
语法: new Array()
<font color=red size=3>
小括号()说明:
(1) 预先知道数组要保存的项目数量
(2) 向Array构造函数中传递数组应包含的项
</font>
2、 使用字面量表示法创建数组
由一对包含数组项的的方括号表示，多个数据项之间以逗号隔开
___
##### 2. 数组元素的读写
读取和设置值时，使用方括号[]并提供相应的索引
说明: 索引是从0开始的正整数
eg:
```javascript {.line-numbers}
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Array</title>
    </head>
    <body>
        <script>
        //1.new Array()
        // 1.不指定个数,默认是空的数组
        //    var colors = new Array();
        // 可以通过给数组相应索引位置直接设置值
        //    colors[0] = #f00";
        //    colors[1] = "#0f0";
        //    console.log(colors); //[]

        // 2.指定个数，元素都是undefined
        //    var colors = new Array(3);
        //    console.log(colors); //  [undefined × 3]

        // 3.创建数组的时候初始化元素
        // var nums = new Array(1, 3, 6);
        // console.log(nums); //[1, 3, 6]

        //2.数组字面量
        var cols = ["red", "yellow", "green"];
        console.log(cols);
        //JS数组元素类型可以不同
        var infos = [6, "marry", true, {email : "marry@sohu.com"}];
        console.log(infos); //[6, "marry", true, Object]
        //读取cols这个数组中索引为1的值
        console.log(cols[1]);
        </script>
    </body>
</html>
```
___
##### 3. 数组长度与数组的遍历
语法: array.length 
功能: 获取数组array的长度, writable可写
返回值: number
<font color=pink size=3>
说明:
1、通过设置length可以从数组的末尾移除项或向数组中添加新项
2、把一个值放在超出当前数组大小的位置上时，会重新计算数组长度值，
长度值等于最后一项索引加1
</font>
数组eg: 
```javascript {.line-numbers}
var arr = ['a', 'b', 'c', 'd'];
console.log(arr.length); //4
arr.length = 3;
console.log(arr);//["a", "b", "c"]
arr[99] = "z"; //array[99]原来是不存在的，undefined
console.log(arr.length); //100
```
数组的遍历eg:
```javascript {.line-numbers}
var arr = ['a', 'b', 'c', 'd'];
for(var i = 0; i < arr.length; i++) {
    console.log(arr[i]);// a b c d
}
```
___
#### 2. 数组方法
##### 1. 掌握数组的栈方法(push、unshift、pop、shift)
**(1) push()**
语法:
arrayObject.push(newele1, newele2,..,neweX)
功能:
把它的参数顺序添加到arrayObject的尾部
返回值:
把指定的值添加到数组后的新长度
**(2) unshift()**
语法: 
arrayObject.unshift(newele1,newele2,...,neweX)
功能:
把它的参数顺序添加到arayObject的开头
返回值:
把指定的值添加到数组后的新长度
**(3) pop()**
语法:
arrayObject.pop()
功能:
删除arrayObject的最后一个元素
返回值被删除的那个元素
**(4) shift()**
语法:
arrayObject.shift()
功能:
删除arrayObject中的第一个元素
返回值:
被删除的那个元素
eg:
```javascript {.line-numbers}
 //push
var colors = new Array("red", "green");
var len = colors.push("blue", "yellow", "black"); 
console.log(colors); //["red", "green", "blue", "yellow", "black"]
console.log(len); // 5 返回新数组的长度

//unshift
var nums = [2, 7, 8, 5];
var size = nums.unshift(99, 66);
console.log(nums);// [99, 66, 2, 7, 8, 5]

//pop
var n = nums.pop();
console.log(n);// 5
// unshift
var m = colors.shift();
console.log(m); //red
```
___
##### 2. 掌握数组的转换方法及重排序方法
**(1) join()**
The join() method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string.
语法:
arrayObject.join(separator)
功能:
用于把数组中的所有元素放入一个字符串
不传入参数默认是逗号,隔开
返回值:
字符串
eg:
```javascript {.line-numbers}
//join
var nums = [2, 4, 5];
var str = nums.join();
console.log(str); //2,4,5
var words = ["border", "left", "color"];
var wordstr = words.join('-');
console.log(wordstr);//border-left-color
```
**(2) reverse()**
The reverse() method reverses an array in place. The first array element becomes the last, and the last array element becomes the first.
语法:
stringObject.reverse()
功能:
用于颠倒数组中元素的顺序
返回值:
数组
```javascript {.line-numbers}
 //join
var nums = [2, 4, 5];
var resersed = nums.reverse();
console.log(resersed);// [5, 4, 2]
/* Careful: reverse is destructive. It also changes
the original array */ 
console.log(nums);// [5, 4, 2]
```
**(3) sort()**
语法:
arrayObject.sort([compareFunction])
compareFunction:
具体使用方法地:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description
Specifies a function that defines the sort order. If omitted, the array is sorted according to each character's Unicode code point value, according to the string conversion of each 
功能:
用于对数组的元素进行排序

返回值: 数组
<font color=pink size=3>
说明:
1、 及时数组中的每一项都是数字,sort()方法比较的也是字符串
2、sort()方法可以接受一个比较函数作为参数
</font>
```javascript {.line-numbers}
var months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months); //默认无参是将元素转换成字符串，按字符逐个比较
// expected output: Array ["Dec", "Feb", "Jan", "March"]
var array1 = [1, 30, 4, 21];
array1.sort();
console.log(array1);
// expected output: Array [1, 21, 30, 4]

//可以看到compareFunction不同，升序和降序排列不同
var arr = [3, 10, 6, 8, 1];
arr.sort(function(a,b){return b-a}); //compareFunction是一个匿名函数
console.log(arr); //[10, 8, 6, 3, 1]
arr.sort(function(a,b){return a-b});
console.log(arr); //[1, 3, 6, 8, 10]
```
___
##### 3. 掌握数组的操作方法
**(1) concat()**
The concat() method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array
语法:
arrayObject.concat(arrayX, arrayX,..., arrayX)
功能:
用于连接两个或多个数组
返回值: 数组
```javascript {.line-numbers}
var arr1 = ["a", "b", "c"],
    arr2 = ["d", "e", 1, 3],
    arr3;
//concat
arr3 = arr1.concat(arr2);
// ["a", "b", "c", "d", "e", 1, 3]
console.log(arr3);
```
**(2) slice()**
The slice() method returns a shallow copy(注意是返回数组的浅拷贝副本) of a portion of an array into a new array object selected from begin to end (end not included). The original array will not be modified.
语法:
arrayObject.slice(start[,end])
功能:
从已有的数组中返回选定的元素
参数:
start(必须)规定从何处开始选取，如是负数，从数组尾部开始算起
end(可选)规定从何处结束选取，是数组片段结束出的数组下标
<font color=pink size=3>
说明:
1、 如没指定end,切分的数组包含从start到数组结束的所有元素
2、 如slice()方法的参数中有一个负数，则用数组长度加上该数来确定相应的位置。
返回值: 数组
</font>
eg:
```javascript {.line-numbers}
// slice
var colors = ["red", "green", "blue", "yellow", "orange"];
var newColors = colors.slice(1, 2);
console.log(newColors);//["green"]
console.log(colors.slice(3));//["yellow", "orange"]
console.log(colors.slice(-2, 4));//["yellow"]
```
**(3) splice()插入删除替换元素**
The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements.
**删除**
语法:
arrayObject.splice(index, count)
功能:
删除从index处开始的零个或多个元素
返回值:
含有被删除的元素的数组
<font color=pink size=3>
说明:
1、 count是要删除的项目数量，如果设置为0，则不会删除项目。如果不设置，则删除从index开始的所有值
</font>
eg:
```javascript {.line-numbers}
// var arr = ['a', 'b', 'c', 'd', 'e', 'f'];
// var delArr = arr.splice(2, 2);
// console.log(arr); //["a", "b", "e", "f"]
// console.log(delArr);// ["c", "d"]

//当count省略时，表示删除自start开始的所有数组元素
var arr1 = ['a', 'b', 'c', 'd', 'e', 'f'];
var delArr1 = arr1.splice(2);
console.log(delArr1);// ["c", "d", "e", "f"]

//当count为0时，表示不删除任何元素,所以返回值是空数组
console.log(arr1.splice(2, 0));// []
```
**插入**
语法:
arrayObject.splice(index, 0, item1,...,itemX)
功能:
在指定位置插入值
参数:
Index: 起始位置
0: 要删除的项数(就类似一个flag一样，count为负数或0，就表示要插入了)
item1...itemX:要插入的项
返回值: 数组
eg:
```javascript {.line-numbers}
var arr = ['a', 'b', 'c', 'd', 'e', 'f'];
var insertArr = arr.splice(3, 0, 'm', 'n');
console.log(arr); // ["a", "b", "c", "m", "n", "d", "e", "f"]
console.log(insertArr); //[] 返回值始终是包含删除元素的数组
```
**替换**
语法:
arrayObject.splice(index, count, item1, ..., itemX)
功能:
在指定位置插入值，且同时删除任意数量的项
参数:
Index: 起始位置
count: 要删除的项数
item1...itemX: 要插入的项
返回值: 从原始数组中删除的项(如果没有删除任何项，则返回空数组)
```javascript {.line-numbers}
var arr = ['a', 'b', 'c', 'd', 'e', 'f'];
var replaceArr = arr.splice(1, 2, 'x', 'y', 'z');
// 将'b','c'删除并替换成'x','y','z'
console.log(arr);//["a", "x", "y", "z", "d", "e", "f"]
console.log(replaceArr);//["b", "c"]
```
___
##### 4. 数组实例的两个位置方法-indexOf()、lastIndexOf()
**(1) indexOf()**
The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.
语法:
arrayObject.indexOf(searchvaue, startIndex)
功能:
从数组的开头(位置0)开始向后查找
参数:
searchvalue: 必需，要查找的项
startIndex: 可选，起点位置的索引
返回值:
number, 查找的项在数组中的位置，没有找到的情况下返回-1
**(2) lastIndexOf()**
语法:
arrayObject.lastIndexOf(searchvalue, startIndex)
功能: 从数组的末尾开始向前查找，其他同indexOf()
eg:
```javascript {.line-numbers}
var nums = [1, 7, 5, 7, 8, 1, 6, 9];
var pos = nums.indexOf(7); // 1 
console.log(pos);
console.log(nums.indexOf(7, 3));// 3
console.log(nums.lastIndexOf(7));//3
```
<font color=pink size=3>
说明:
1、 在比较第一个参数与数组中的每一项时，会使用全等操作符，即要求查找的项必需严格相等
2、 数组的位置方法是ECMAScript5为数组实例新增的，所以不支持的浏览器有:Firefox1.5及以下、IE9及以下
</font>

___
#### 3. js对象之String
##### 1. 字符串对象的常用方法
`charAt()、charCodeAt()、indexOf()、lastIndexOf()`
**(1) charAt()与charCodeAt()**
**charCodeAt()**
语法:
stringObject.charCodeAt(index)
功能:
返回stringObject中index位置字符的字符编码
**charAt()**
语法:
stringObject.charAt(index)
功能:
返回stringObject中index位置的字符,index超出范围返回空字符串
<font color=pink size=3>
说明:
1、 ECMAScript5中可使用"方括号加字符索引"来访问字符串中特定的字符，但是IE7及更早的浏览器会返回undefined
</font>
**(2) indexOf与lastIndexOf**
**indexOf()**
语法:
stringObject.indexOf("o")
功能:
从一个字符串中搜索给定的子字符串，返回子字符串的位置(子串第一次出现的位置)
返回值: 数值
<font color=pink size=3>
说明: 如果没有找到该子字符串，则返回-1
</font>
**lastIndexOf()**
语法:
stringObject.lastIndexOf("o");
与IndexOf()区别在于从字符串末尾开始检测
eg:
```javascript {.line-numbers}
var str = "hello world";
console.log(str[1]); //e
console.log(str.charCodeAt(4));//111
var email = "marry@163.com";
console.log(email.indexOf('@'));// 5
console.log(email.indexOf('z')); //-1
console.log(email.lastIndexOf('.')); //9
```
___
##### 2. 字符串对象的截取方法:
`slice()、substring()、substr()`
**(1) slice()**
语法:
stringObject.slice(start, end)
功能: 截取子字符串
<font color=pink size=3>
参数说明:
1、start: 必须，指定子字符串的开始位置
2、end: 可选，表示子字符串到哪里结束，end本身不在截取范围之内，省略时截取至字符串的末尾
3、 当参数为负数时，会将传入的负值与字符串的长度相加
</font>
**(2) substring()**
说明: 语法及功能同slice()完全一样
区别在于:
1、 当参数为负数时，自动将参数转换为0
**(3) substr()**
语法:
stringObject.substr(start, len)
功能:
截取子字符串
参数说明:
1、 start:必须，指定子字符串的开始位置
2、 len: 可选，表示截取的字符总数，省略时截取至字符串的末尾.
3、 当start为负数时，会将传入的负值与字符串的长度相加
4、 当len为负数时，返回空字符串
eg:
```javascript {.line-numbers}
 //1. slice
var str = "hello world";
// 截取orl
console.log(str.slice(7, 10));//orl
console.log(str.slice(1)); //ello world
//相当于str.slice(8);
console.log(str.slice(-3));  //rld
//str.slice(4, 9);
console.log(str.slice(-7, -2));

//2. substring
console.log(str.substring(-7, 5));//hello
console.log(str.substring(-4, -7)); //空字符串
//注:
//str.slice(5,2) //是""空串
// str.substring(5,2) //是"llo"

//2. substr
console.log(str.substr(6, 3)); //wor
console.log(str.substr(-5, 4)); //(6, 4) worl
console.log(str.substr(3, -4)); // ""空字符串
```
获取扩展名eg:
```javascript {.line-numbers}
// 获取扩展名
var url = "http://youaresherlock.com/index.txt";
function getFileFormat(url) {
    //获取.在url中出现的位置
    var pos =  url.lastIndexOf(".");
    return url.substr(pos + 1);
}
var formatName = getFileFormat(url);
var picFormat = getFileFormat("youaresherlock.jpg");
console.log(formatName); //txt
console.log(picFormat); //jpg
```
##### 3. 字符串的其他方法
**(1) split()**
语法: 与join()方法相反
stringObject.split(separator)
功能:
把一个字符串分割成字符串数组
返回值: Array
<font color=pink size=3>
说明:
separator: 必需，分隔符
</font>
```javascript {.line-numbers}
var str = "welcome-to-beijing";
// split
var arr = str.split("-");
console.log(arr); //["welcome", "to", "beijing"]
var date = '2016/10/24';
var dateArr = date.split("/");
console.log(dateArr); // ["2016", "10", "24"]
```
**(2) replace()**
语法:
stringObject.replace(regexp/substr, replacement)
功能:
在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串
返回值: new string with some or all matches of a pattern replaced by a replacement.
注: 并不会改变原始字符串
参数:
regexp: 必需。规定子字符串或要替换的模式的RegExp对象
replacement: 必须，一个字符串值
实际上replacement也可以为调用的函数
eg:
```javascript {.line-numbers}
var tel = "010-12294398, 400-100-9090, 010-93023453";
var newTel = tel.replace(',', " ");
console.log(tel);//010-12294398, 400-100-9090, 010-93023453
console.log(newTel); //010-12294398  400-100-9090, 010-93023453
```
**(3) toUpperCase()与toLowerCase()**
语法:
stringObject.toUpperCase()
功能: 把字符串转换为大写
语法:
stringObject.toLowerCase()
功能: 把字符串转换为小写
eg:
```javascript {.line-numbers}
var str = "hello world";
var upper = str.charAt(6).toUpperCase();
console.log(str.toUpperCase());// HELLO WORLD
console.log(upper);// W
var str2 = "WELCOME";
console.log(str2.toLowerCase()); //welcome
//border-left-color---> borderLeftColor 
function camelback(str) {
    // 拆分成数组，然后改变大小写，然后join
    var arr = str.split('-'), newStr = arr[0];
    for(var i = 1, len = arr.length; i < len; i++) {
        var word = arr[i];
        newStr +=  word.charAt(0).toUpperCase() + word.substr(1);
    }
    return newStr;
}
var camelFormat = camelback("border-left-color");
console.log(camelFormat); //borderLeftColor
```

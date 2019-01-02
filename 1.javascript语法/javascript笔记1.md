>特意给前端初学者用markdown做一个js简明教程，分享给大家
___
>视频教程及ppt代码地址[github](https://github.com/youaresherlock/JavaScriptLearningNotes)
___
### 1.JavaScript语法 

#### 1. 初识javascript

#####  1. 什么是javascript
&emsp; javascript是一种基于对象和事件驱动的客户端脚本语言，最初的设计是为了检验HTML表单输入的正确性，起源于Netscape公司的LiveScript语言。
##### 2. JavaScript的组成
&emsp; 完整的JavaScript是由ECMAScript(语法)、Browser Objects(DOM、BOM)(特性)组成的。
##### 3. 如何在HTML中使用JavaScript
&emsp; 可以在head或body中使用&lt;script&gt;嵌入javascript脚本。
___
#### 2. js的语法规则
**(1) JavaScript的注释与分号**
//单行注释
/**/多行注释
语句结束使用分号，如果省略，则由解析器确定语句的结尾
**(2)大小写敏感**
ECMAScript中的一切(变量、函数名和操作符)都区分大小写
**(3)JavaScript的标识符**
##### 1. 什么是标识符?
变量、函数、属性的名字、或者函数的参数。
#####  2. 标识符的命名规则:
(1) 由字母、数字、下划线(_)或美元符号($)组成
(2) 标识符不能以数字开头
(3) 不能使用关键字、保留字作为标识符
#####  3. 什么是变量?
ECMAScript的变量是松散类型的
松散类型: 可以用来保存任何类型的数据(这个是动态类型语言)换句话说，每个变量仅仅是一个用于保存值的占位符而已。
#####  4. 变量的声明与赋值
(1)变量声明:
变量的声明要使用var操作符,
语法: var 变量名
(2) 变量赋值:
声明的同时赋值: var 变量名 = 值
先声明后赋值: 变量名 = 值
一次声明多个变量，用逗号隔开 var id, sex, age, name = "marry";
>注:
1、省略var声明的变量是全局变量
2、不推荐省略var操作符来定义全局变量
___
#### 3. js数据类型
![js的数据类型](https://img-blog.csdnimg.cn/20181216171443149.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyMjUyOTU3,size_16,color_FFFFFF,t_70)
##### 1.typeof操作符
功能: 检测变量类型
语法 typeof变量或typeof(变量)
返回值 string类型的字符串，有可能是下面任何一个:
string, number, boolean, object, undefined, function
##### 2.null和undefined类型
undefined:
undefined类型只有一个值，即特殊的undefined.
说明:
	一般而言，不存在需要显示地把一个变量设置为undefined(声明只要不赋值就是undefined)
**null**
1、null值表示一个空对象指针
2、如果定义的变量准备在将来用于保存对象，那么最好将该变量初始化为null而不是其他值,当时使用\比较运算符比较null和undefined的时候，EMCA规定nul ==undefined都是false
##### 3. Number类型、isNaN()方法及数据类型的转换方法
Number: 表示整数和浮点数
NaN: 即非数值(Not a Number)是一个特殊的数值 
	console.log(3 - 'abc');在控制台上打印的是NaN
说明:
1、任何涉及NaN的操作(例如NaN/10)都会返回NaN.
2、NaN与任何值都不相等，包括NaN本身。
**isNaN(n):**
&emsp;功能:检测n是否是"非数值" 返回值: boolean
说明: isNaN()对接受的数值，先尝试转换为数值，再检测是否为非数值(eg isNaN("16")返回的是false,而不是true)
##### 4.数值转换 有三个函数可以把非数值转换为数值
Number()、parseInt()、parseFloat()
说明:
1、Number()可以用于任何数据类型
2、parseInt()和parseFloat()则专门用于把字符串转换成数值

**Number():**
	此函数把对象的值转换为数字
	如果对象的值无法转换为数字，那么Number()函数返回NaN

**parseInt(string, radix):** 
	会忽略字符串前面的空格，直至找到第一个非空格字符。
说明:
1、 parseInt(): 转换空字符串返回NaN.
2、 parseInt()这个函数提供第二个参数: 转换时使用的基数(即多少进制)string必需传入，而radix可选。

**parseFloat():**
从第一个字符开始解析每个字符，直至遇见一个无效的浮点数字符为止。
说明:
	除了第一个小数点有效外，parseFloat()与parseInt()的第二个区别在于它始终都会忽略前导的零。
eg: parseFloat("12.34.56px")结果为12.34
	parseFloat("00.01")结果为0.01
___
##### 4.js的string和boolean类型
**String:**
	String类型用于表示由零或多个16位Unicode字符组成的字符序列，
即字符串。字符串可以由双引号("")或单引号('')来表示--有些语言是
区分的，低层实现字符串实际上还是字符数组。

**toString()和String()**
语法: str.toString()
功能: 将str转换为字符串
返回值: str的一个副本
参数: str是要转换的内容，可以是数值、布尔值、对象和字符串。
说明: 在不知道要转换的值是不是null或undefined的情况下，还
可以使用String()函数，它能够将任何类型的值转换为字符串

**Boolean:**
用于表示真假的类型，即true表示真， false表示假

>类型转换:
>1、除0之外的所有数字，转换为布尔型都为true
>2、除""之外的所有字符，转换为布尔型都为true
>3、 null和undefined转换为布尔型为false

*下面例子都是在浏览器控制台下直接实验，再不提示*
```javascript {.line-numbers}
eg:
Boolean(1)
true
Boolean(0)
false
Boolean(undefined)
false
Boolean("")
false
Boolean(" ")
true
Boolean(null)
false
```
___
#### 5.js算数操作符
>什么是表达式:
	将同类型的数据(如常量、变量、函数等)，用运算符号按
一定的规则连接起来的、有意义的式子称为表达式。
操作符的分类:
1、算数操作符
2、逻辑操作符
3、赋值操作符
4、比较操作符

###### 1.算数操作符
|运算符|含义|
|:---|:---:|---:|
|+|加|
|- |减|
|*|乘|
|/| 除|
|%| 取余(求模)|
```javascript {.line-numbers}
eg:
var num1 = 10, num2 = "5";
undefined
num1 * num2
50
num2 = "b"
"b"
num1 * num2
NaN
```

**递增和递减**
**(1)递增** 
++a与a++都是对a进行递增的操作
区别:
++a先返回递增之后的a的值
a++先返回a的原值，再返回递增之后的值
2、递减同理

**(2) 赋值操作符**
简单赋值: =
复合赋值: +=、-=、*=、/=、%=
复合赋值之间简化运算的，方便程序员书写而已
**(3) 比较运算符(和python,java语言的不太一样)**
比较运算符在逻辑语句中使用，以测定变量或值是否相等
`>、<、>=、<=、==、===、!=、!==
==: 相等，只比较值是否相等
===: 相等，比较值的同时比较数据类型是否相等
!=: 不相等，比较值是否不相等
!==: 不相等，比较值的同时比较数据类型是否不相等
返回值: boolean类型`

eg:
```javascript {.line-numbers}
var x = 10, y = "10", c= x== y;
undefined
c
true
b = x === y
false
10 !== "10"
true
10!="10"
false
console.log(null == undefined)
VM422:1 true
undefined
console.log(null === undefined)
VM473:1 false
undefined
typeof null
"object"
typeof undefined
"undefined"
```
**(4) 三元操作符**
语法: 
	条件?执行代码1:执行代码2
说明:
	可代替简单的if语句，如果条件成立，执行代码1，否则执行代码2

**(5)逻辑操作符**
逻辑操作符分为: 
&&: 与, ||: 或,  !: 非

**逻辑与**
&&与(只要有一个条件不成立，返回false)
说明:
在有一个操作数不是布尔值的情况，逻辑与操作就不一定返回值，此时它
>遵循下列规则:
1、 如果第一个操作数隐式类型转换后为true,则返回第二个操作数
eg:
```javascript {.line-numbers}
console.log("test" && 10)
10
undefined
console.log(1 && "test")
test
undefined
Boolean("test")
true
console.log(80 &&55)
55
undefined
true && "fuck" /*这里直接就是true布尔值，不需要隐式转换，还是返回第二个值*/
"fuck"
```
>2、 如果第一个操作数隐式类型转换后为false,则返回第一个操作数
3、 如果有一个操作数是null,则返回null  "" && null结果是""，而不是null，因为要满足第二条
4、 如果有一个操作数是NaN,则返回NaN
5、 如果有一个操作数是undefined,则返回undefined

eg:
```javascript {.line-numbers}
"" && 1
""
null && 10
null
undefined && "test"
undefined
typeof undefined && "test"
"test"
```
**(6) 逻辑操作符-逻辑或**
|| 或(只要有一个条件成立，返回true)
eg:
```
console.log(55!="55" || 88=="88");
true
```
说明: 在有一个操作数不是布尔值的情况，逻辑与操作就不一定返回值，此时
>它遵循下列规则:
1、如果第一个操作符隐式类型转换后为true,则返回第一个操作数
2、如果第一个操作符隐式类型转换后为false,则返回第二个操作数
进一步推理，由于null、NaN、undefined隐式转换后都为false,因此下面
结论自然成立
3、如果两个操作数是null,则返回null
4、如果两个操作数是NaN,则返回NaN
5、如果两个操作数是undefined,则返回undefined

eg:
```javascript {.line-numbers}
console.log("hello" || 0);
VM1665:1 hello
undefined
console.log("hello" || "test");
hello
undefined
console.log(0 || 99 || "test")
99
undefined
"" || 0 || "abc"
"abc"
console.log(30*"abc" || 55-"def")
NaN
undefined
```
**(7) 逻辑操作符-逻辑非**
!非
说明:
	1、无论操作数是什么数据类型，逻辑非都会返回一个布尔值
eg:
```javascript {.line-numbers}
console.log(!0)
true
undefined
console.log(!100)
false
undefined
console.log(!"red")
false
undefined
console.log(!NaN);
true
undefined
console.log(!undefined)
true
undefined
console.log(!null)
true
undefined
console.log(!!!!null) 奇数个false,为false
false
undefined
console.log(!!!"") 偶数个false,为true
true
undefined
```
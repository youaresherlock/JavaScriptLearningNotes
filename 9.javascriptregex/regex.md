>&emsp; 我们在开发中经常会用到正则表达式，比如匹配ip address、phone number、mac address、email等等。熟悉各种开发语言的中级程序员可能经常会要翻手册来用正则表达式:sob:(因为记忆模糊，也没必要记住复杂的API，只要记住通用的规则就好了，又不是老鸟，哈哈:grin:)
>&emsp; 因此总结了正则表达式的相似部分，便于大家记忆与应用(js为例)
>&emsp; 建议阅读时间: 20 minutes 
___
##### 1. 什么是正则表达式:
>&emsp;Regular Expression,在代码中常简写为regex,使用单个字符串来描述、匹配一系列符合某个语规则的字符串搜索模式

>文档: 
>&emsp;[正则表达式工具](http://regexper.com)  
>&emsp;[英文文档](https://javascript.info/regular-expressions) 
> &emsp;[速查中文文档](https://www.jb51.net/shouce/jquery1.82/regexp.html)     
> &emsp;[js简单中文文档](http://www.runoob.com/js/js-regexp.html)
___
#### 2. 正则表达式通用规则
注: js正则语法为 `/正则表达式主体/修饰符(可选)`
**常用修饰符**
修饰符|含义
--|:--:
i|ignore case执行对大小写不敏感匹配,默认大小写敏感
g|global执行全局匹配(查找所有匹配而非在找到第一个匹配后停止)
m|执行多行匹配,multiple lines多行搜索
**常用元字符**
字符  |   含义
--|:--:
.	|匹配除换行符以外的任意字符
\w|	匹配字母或数字或下划线
\s|	匹配任意的空白符
\d|	匹配数字
\b|	匹配单词的开始或结束
^	|匹配字符串的开始
$	|匹配字符串的结束
**常用反义词**
字符|    含义
--|:--:
\W|	匹配任意不是字母，数字，下划线，汉字的字符
\S	|匹配任意不是空白符的字符
\D	|匹配任意非数字的字符
\B	|匹配不是单词开头或结束的位置
[^x]|	匹配除了x以外的任意字符
[^aeiou]|	匹配除了aeiou这几个字母以外的任意字符
**量词**
字符 | 含义
--|:--:
?      |最多出现一次(零次或一次)
+     | 出现一次或多次(至少出现一次)
*     | 出现零次或多次(任意次)
{n}  |  出现n次
{n,m}| 出现n到m次 // 注意不要写成{n,空格m}
{n,}  |至少出现n次
<font color=pink size=4>默认是贪婪模式匹配(后面有),如要非贪婪模式，在两次加上一个?</font>
字符 | 含义
--|:--:
*? |重复任意次，但尽可能少重复  
+?| 重复1次或更多次，但尽可能少重复  
??| 重复0次或1次，但尽可能少重复  
{n,m}?| 重复n到m次，但尽可能少重复  
{n,}? |重复n次以上，但尽可能少重复  

<font color=pink size=4>正则表达式(括号)、[中括号]、{大括号}的区别小结:</font>
>()是为了提取匹配的字符串。表达式中有几个()就有几个相应的匹配字符串
[]是定义匹配的字符范围.比如[a-zA-Z0-9]表示相应位置的字符要匹配英文字符和数字
{}一般用来表示匹配的长度，比如\s{3}表示匹配三个空格,\s{1,3}表示匹配一到三个空格

**案例:**
eg1:
```
http://img.host.com/images/afafagg.jpg
匹配所有http协议的jpg图片,修改为去除http的部分
正则: http:(\/\/.+\.jpg)替换为$1
```

eg2:
```
2006/02/03
1998-03-07匹配所有日期
The caret ^ matches at the beginning of the text, and the dollar $ – in the end.
正则: ^(\d{4})[/-](\d{2})[/-](\d{2})$
```

eg3:
```
\w表示包括下划线的任何单词字符,等价于[A-Za-z0-9_]
let reg = /[-.\w/g]+@([\w-])+\.)+[\w-]{2,20}$/g;
let str1 = 'My email is mail@site.com';
alert(reg.test(str1)); // true
```
eg4:
```
let str = "#abcdef";
let reg = /^#[a-f0-9]{6}$/i;
```

eg5:
```
正则表达式检验字符串是一个Mac-address('01:31:54:67:89:AB')
let reg = /^[0-9a-fA-F]{2}(:[0-9a-fA-F]{2}){5}$/i;
alert( reg.test('01:32:54:67:89:AB') ); // true
```
___
#### 3. javascript中的正则表达式相关API使用
**REGEXP对象**
>&emsp;Javascript通过内置对象RegExp支持正则表达式,其实一个预定义了属性和方法的正则表达式对象
&emsp;有两种方法实例化RegExp对象: 字面量、构造函数


*匹配第一个满足的is单词*
```js {line-numbers}
var reg = /\bis\b/;
"He is a boy. This is a dog. where is she?".replace(reg, 'IS');
"He IS a boy. This is a dog. where is she?"
```
*全局匹配*
```js {line-numbers}
var reg = /\bis\b/g;
'He is a boy. This is a dog. where is she?'.replace(reg, 'IS');
"He IS a boy. This IS a dog. where IS she?"

```
*构造函数*
```js {line-numbers}
var reg = new RegExp('\\bis\\b', 'g'); //字符串需要转义
"He is a boy. This is a dog. where is she?".replace(reg, 'IS');
"He IS a boy. This IS a dog. where IS she?"
```


**JS正则贪婪模式与非贪婪模式**
>&emsp;贪婪匹配: 正则表达式一般趋向于最大长度匹配，也就是所谓的贪婪匹配
&emsp;非贪婪匹配: 就是匹配到结果就好，最少的匹配字符
&emsp;编程中如何区分两种模式:
&emsp;&emsp;默认是贪婪模式(python、js、java等);在量词后面直接加上一个问号?就是非贪婪模式

eg:
```js {line-numbers}
//贪婪模式
'12345678'.replace(/\d{3,6}/g, 'X');
"X78" 
// 非贪婪模式,量词后加?
'12345678'.replace(/\d{3,6}?/g, 'X'); 
"XX78"
// 注意非贪婪模式和g修饰符区别,这里很多人容易混淆
'12345678'.replace(/\d{3,6}?/, 'X');
"X45678"
```

**分组:**
>&emps;使用()可以达到分组的功能，使量词作用于分组
>&emsp;使用|配合()也可以达到类似功能
&emsp;忽略分组: 
    &emsp;&emsp;不希望捕获某些分组，只需要再分组内加上?:就可以了
    
eg:
```js {line-numbers}
// ()
'a1b2c3d4'.replace(/[a-z]\d{3}/g, 'X');
"a1b2c3d4"
'a1b2c3d4'.replace(/([a-z]\d){3}/g, 'X');
"Xd4"
// (on|Ca) 匹配on或Ca
'ByronCasper'.replace(/Byron|Casper/g, 'X');
"XX"
'ByronsperByrCasper'.replace(/Byr(on|Ca)sper/g, 'X');
"XX"
```

**反向引用:**
		将'2015-12-25'给成mdy形式'11/25/2016'
eg:
```js {line-numbers}
'2015-12-25'.replace(/(\d{4})-(\d{2})-(\d{2})/g, '$2/$3/$1');
'2015-12-25'.replace(/(\d{4})-(\d{2})-(\d{2})/g, '$2/$3/$1');
"12/25/2015" // $1、$2按()分组顺序可以获取对应分组的内容
```

**前瞻**
>&emsp;正则表达式从文本头部向尾部开始解析，文本尾部方向，称为"前"
&emsp;前瞻就是在正则表达式匹配到规则的时候，向前检查是否否和断言，后顾/后瞻方向相反
&emsp;js不支持后顾
&emsp;符合和不符合特定断言称为肯定/正向匹配和否定/负向匹配

名称   |     正则   |    含义
| :-: |:-:|:-:|
正向前瞻 |   exp(?=assert)  |     正向肯定预查，在任何匹配pattern的字符串开始处匹配查找字符串
负向前瞻    |exp(?!assert)|       正向否定预查,在任何不匹配pattern的字符串开始处匹配查找字符串
正向后顾  |  exp(?<=assert)  |    同理,js不支持
负向后顾|    exp(?<!assert) |     同理,js不支持

eg:
```js {line-numbers}
// 正向前瞻
'a2*34v8'.replace(/\w(?=\d)/g, 'X');
"X2*X4X8" //a单词后数字断言正确,因此替换a为X，存在g修饰符继续这样子就可以
// 负向前瞻
'a2*34v8'.replace(/\w(?!\d)/g, 'X');
"aX*3XvX" //2后面是*非数字，断言正确，2替换为X...
```

**js RegEx属性:**
>&emsp;global: 是否全文搜索,默认false
&emsp;ignore case: 是否大小写敏感,默认是false
&emsp;multiline: 多行搜索,默认值是false
&emsp;lastIndex: 是当前表达式匹配内容的最后一个字符的下一个位置
&emsp;source: 正则表达式的文本字符串
&emsp;注: 这些属性是only read只读的

eg:
```js {line-numbers}
> var reg1 = /\w/;
> var reg2 = /\w/gim;
> reg1.global
< false
> reg1.ignoreCase
< false
> reg1.multiline
< false
> reg2.global
< true
> reg2.ignoreCase
< true
> reg2.multiline
< true
> reg1.source
< "\w"
> reg2.source
< "\w"
```
**RegExp方法:** 

1. RegExp.prototype.test(str)
    >用于测试字符串参数中是否存在匹配正则表达式模式的字符串
    如果存在则返回true,不存在false\
    
eg:
```js {line-numbers}
> var reg = /w/;
> reg.test('a')
< false
> reg.test('$')
< false
注: test方法会改变RegExp对象的lastIndex属性，因此会出现一些隐晦的错误
eg:
> var reg1 = /\w/;
> var reg2 = /\w/g;
> reg1.test('a')
< true
> reg1.test('ab') //由于没有g修饰符，所以怎么样都是true,lastIndex始终为0
< true
> reg1.test('abc')
< true
> reg2.test('ab')
< true
> reg2.test('ab')
< true
> reg2.test('ab')
< false
> reg2.test('ab')
< true
> //实际上是reg2对象的lastIndex属性改变(0、1、2),测试了a之后会继续测试b然后错误,测试a,测试b
```

2.  RegExp.prototype.exec(str)
	>&emsp;使用正则表达式模式对字符串执行搜索，并将更新全局RegExp对象的属性以反映匹配结果
    &emsp;如果没有匹配的文本则返回null,否则返回一个结果数组:
    &emsp;数组都有两个额外属性index、input
    &emsp;&emsp; --- index 声明匹配文本的第一个字符的位置
    &emsp;&emsp; --- input 存放被检索的字符串string
&emsp;非全局调用:
    &emsp;&emsp;调用非全局的RegExp对象的exec()时,返回数组
    &emsp;&emsp;第一个元素是与正则表达式相匹配的文本(非全局调用，因此只有一项匹配)
    &emsp;&emsp;第二个元素是与RegExpObject对象的第一个子表达式相匹配的文本(如果有的话)
   &emsp;&emsp; 第三个元素是与RegExp对象的第二个子表达式相匹配的文本(如果有的话),以此类推
   
eg:
```js {line-numbers}
> var reg1 = /\d(\w)\d/;
> var reg2 = /\d(\w)\d/g;
> var str = "1a2b3c4d5e";
> var ret1 = reg1.exec(str);
> ret1 //匹配到"1a2", 第一个分组(\w)匹配到"a",input是相匹配文本,index是第一个匹配的位置
< (2) ["1a2", "a", index: 0, input: "1a2b3c4d5e"]
> var ret2 = reg2.exec(str);
> ret2
< (2) ["1a2", "a", index: 0, input: "1a2b3c4d5e"]
> reg2.lastIndex
< 0
> var ret2 = reg2.exec(str); //可以看到reg2的lastIndex变化了
> reg2.lastIndex
< 7
> ret2 //开始匹配下一个符合的
< (2) ["3c4", "c", index: 4, input: "1a2b3c4d5e"]
```

 **js 字符串对象方法**
1. Stringl.prototype.search(reg)
    >&emsp;search()方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串
    &emsp;方法返回第一个匹配结果index,查找不到返回-1
    &emsp;search()方法不执行全局匹配，它将忽略标志g,并且总是从字符串的开始进行检索

eg:
```js {line-numbers}
> //传入不是正则会将其转换成正则
> 'a1b2c3d1'.search('1')
< 1
> 'a1b2c3d1'.search(/1/); //支持传入正则表达式
< 1
> 'a1b2c3d1'.search('10')
< -1
```
2. String.prototype.match(reg) 
   >&emsp;match()方法将检索字符串，以找到一个或多个与regexp匹配的文本
    &emsp;regexp是否具有标志g对结果影响很大
&emsp;非全局调用:
       &emsp;&emsp;这种情况下与RegExp.prototype.exec(str)返回值一样.(语言设计者让开发者便于灵活使用正则)
        &emsp;&emsp;如果regexp没有标志g,那么match()方法就只能在字符串中执行一次匹配
        &emsp;&emsp;如果没有找到任何匹配的文本，将返回null,否则它将返回一个数组，其中存放了与它找到的匹配文本有关的信息
        &emsp;&emsp;返回数组的第一个元素存放的是匹配文本，而其余的元素存放的是与正则表达式的子表达式匹配的文本
    &emsp;&emsp;除了常规的数组元素之外，返回的数组还含有2个对象属性
        &emsp;&emsp;&emsp;--- index 声明匹配文本的起始字符在字符串的位置
       &emsp;&emsp;&emsp; --- input声明对stringObject的引用
    &emsp;全局调用:
            &emsp;&emsp;如果regexp具有标志g则match()方法将执行全局检索，找到字符串中的所有
        &emsp;&emsp;匹配子字符串
            &emsp;&emsp;&emsp;没有找到任何匹配的子串，则返回null //红
            &emsp;&emsp;&emsp;如果找到了一个或多个匹配子串，则返回一个数组 //红
            &emsp;&emsp;&emsp;数组元素中存放的是字符串中所有的匹配子串，而且也没有index属性或input属性
            
eg:
```js {line-numbers}
> var reg = /\d(\w)\d/g;
> var str = "$1a2b3c4d5e";
> ret = str.match(reg);
< (2) ["1a2", "3c4"]
```
3. String.prototype.split(reg)
eg:
```js {line-numbers}
> 'a,b,c,d'.split(','); 
< (4) ["a", "b", "c", "d"]
> 'a1b2c3d'.split(/\d/);
< (4) ["a", "b", "c", "d"]
```
4. String.prototype.replace
>&emsp; String.prototype.replace(str, replaceStr)
    &emsp; String.prototype.replace(reg, replaceStr)
    &emsp; String.prototype.replace(reg, function)
    &emsp; function参数含义: 
    &emsp; function会在每次匹配替换的时候调用，有四个参数,
    每次匹配替换的结果是函数的返回值
        &emsp; &emsp; 1、匹配字符串
        &emsp; &emsp; 2、 正则表达式分组内容,没有分组则没有该参数
        &emsp; &emsp; 3、 匹配项在字符串中的index
        &emsp; &emsp; 4、 原字符串
    
eg:
```js {line-numbers}
> 'a1b'.replace('1', 2);
< "a2b"
> 'a1b1c2'.replace('1', 2); //会自动转换成'a1b2c2'.replace(/1/, 2);
< "a2b1c2"
> 'a1b1c2'.replace(/1/g, 2);
< "a2b2c2"
```
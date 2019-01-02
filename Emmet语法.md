#### Emmet语法
>什么是 Emmet 语法？简单来说，就是可以快速构建 HTML 结构的快捷语法。

本人使用的是VSCode编辑器，安装插件是JavaScript (ES6) code snippets
,支持Emmet语法,真的很方便

##### 1. 什么是Emmet
参考文档:[Emmet](https://docs.emmet.io/)
> Emmet takes the snippets idea to a whole new level: you can type CSS-like expressions that can be dynamically parsed, and produce output depending on what you type in the abbreviation. Emmet is developed and optimised for web-developers whose workflow depends on HTML/XML and CSS, but can be used with programming languages too.
可以将入可动态解析的类似css表达式，并根据输入的缩写生成输入，简单来说少打字

___
##### 2. Abbreviations Syntax(缩写语法)
>Emmet uses syntax similar to CSS selectors for describing elements’ positions inside generated tree and elements’ attributes.
使用类似css选择器语法表示元素在生成树的位置，和元素的属性

**1. Elements元素**
You can use elements’ names like div or p to generate HTML tags. Emmet doesn’t have a predefined set of available tag names, you can write any word and transform it into a tag: div → `<div></div>`, foo → `<foo></foo> `and so on.
也就是说直接输入元素，然后回车就可以快速产生标签了
___

**2. Nesting operators嵌套运算符**
Nesting operators are used to position abbreviation elements inside generated tree: whether it should be placed inside or near the context element.
嵌套运算符用于在生成的树内定位缩写元素：它是否应该放置在上下文元素内部或附近。
**(1) Child: >**
可以使用>运算符操作来创建子代
```div>ul>li```
div下有一个子代的div,紧接着有一个li标签
将会生成:
```html {.line-numbers}
<div>
    <ul>
        <li></li>
    </ul>
</div>
```
**(2) Sibling: +   兄弟姊妹缩写**
可以使用+运算符将元素放在相邻的同样等级上
```div+p+bq```
将会生成:
```html {.line-numbers}
<div></div>
<p></p>
<blockquote></blockquote>
```
**(3) Climb-up: ^**
我们将+和>操作符联合运用起来:
```div+div>p>span+em```
将会生成: 
```html {.line-numbers}
<div></div>
<div>
    <p>
        <span></span>
        <em></em>
    </p>
</div>
```
每次使用一次^运算符，每个操作将会在深的树上升一层
```div+div>p>span+em^bq```
将会生成: 
```html {.line-numbers}
<div></div>
<div>
    <p><span></span><em></em></p>
    <blockquote></blockquote>
</div>
```
也可以使用多个^运算符，来使^后面的元素上升
<font color=pink size=3>
注: 
^之后的所有元素都将上升相同的高度
</font>
eg:
```div+div>p>span+em^^^bg```
我们可以看到有+、>、>因此一共有三层，
^^^可以上升三层，因此bg在第一层
将会生成:
```html {.line-numbers}
<div></div>
<div>
    <p><span></span><em></em></p>
</div>
<blockquote></blockquote>
```
___
**(4) Multiplication:  `*`**
With * operator you can define how many times element should be outputted:
可以用乘法运算符来控制元素输出的数量
```ul>li*5```
将会生成: 
```html {.line-numbers}
<ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
</ul>
```
___
**(5) Grouping: ()**
使用括号来对复杂缩写的子树进行分组
```div>(header>ul>li*2>a)+footer>p```
将会生成: 
```html {.line-numbers}
<div>
    <header>
        <ul>
            <li><a href=""></a></li>
            <li><a href=""></a></li>
        </ul>
    </header>
    <footer>
        <p></p>
    </footer>
</div>
```
其实这个方法就像是递归操作，将复杂问题简单化，括号可以阅读和理解很方便，利于开发者快速书写。上案例，div有两个子元素结点，footer和括号内容,footer有一个子元素结点p
eg:
```(div>dl>(dt+dd)*3)+footer>p```
将会生成:
```html {.line-numbers}
<div>
    <dl>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
    </dl>
</div>
<footer>
    <p></p>
</footer>
```
___
**3. Attribute operators属性运算符**
Attribute operators are used to modify attributes of outputted elements. For example, in HTML and XML you can quickly add class attribute to generated element.属性运算符可以快速的增加输出元素的属性
**(1) ID and CLASS**
In CSS, you use elem#id and elem.class notation to reach the elements with specified id or class attributes. In Emmet, you can use the very same syntax to add these attributes to specified element:也就是说和id选择器和类选择器类似
```div#header+div.page#footer.class1.class2.class3```
将会生成:
```html {.line-numbers}
<div id="header"></div>
<div class="page"></div>
<div id="footer" class="class1 class2 class3"></div>
```
**(2) Custom attributes 自定义属性**
可以使用[attr]来给元素添加自定义属性
```td[title="hello world!"] colspan=3]```
将会生成:
```html {.line-numbers}
<td title="hello world!" colspan="3"></td>
```
**(3) Item numbering: `$`**
With multiplication * operator you can repeat elements, but with $ you can number them. Place $ operator inside element’s name, attribute’s name or attribute’s value to output current number of repeated element:
可以看到$和*运算符是搭配使用的
```ul>li[name="hello$"]*4```
将会生成:
```html {.line-numbers}
<ul>
    <li name="hello1"></li>
    <li name="hello2"></li>
    <li name="hello3"></li>
    <li name="hello4"></li>
</ul>
```
```ul>li.item$$$*5 ```
将会生成:
```html {.line-numbers}
<ul>
    <li class="item001"></li>
    <li class="item002"></li>
    <li class="item003"></li>
    <li class="item004"></li>
    <li class="item005"></li>
</ul>
```
**当然你也可以降序排列属性值@-**
```ul>li.item$@-*5```
将会生成:
```html {.line-numbers}
<ul>
    <li class="item5"></li>
    <li class="item4"></li>
    <li class="item3"></li>
    <li class="item2"></li>
    <li class="item1"></li>
</ul>
```

**可以使用@N来修改$初始值**
```ul>li.item$@3*5```
将会生成:
```html {.line-numbers}
<ul>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
    <li class="item6"></li>
    <li class="item7"></li>
</ul>
```
**当然可以一起使用@N和@-**
```ul>li.item$@-3*5```
将会生成:
```html {.line-numbers}
<ul>
    <li class="item7"></li>
    <li class="item6"></li>
    <li class="item5"></li>
    <li class="item4"></li>
    <li class="item3"></li>
</ul>
```
**(4) Text: {}**
You can use curly braces to add text to element:可以用{}大括号来添加文本内容
```a{click me}```
将会生成:
```html {.line-numbers}
<a href="">Click me</a>
```
举个复杂的例子:
```p>{Click }+a{here}+{ to continue}```
将会生成:
```html {.line-numbers}
 <p>
    Click 
    <a href="">here</a>
    to continue
</p>
```
可以这样来思考,{Click }+a{here}+{ to continue}可以生成Clicka{here}to continue,然后整体是p的子代
___
<font color=pink size=3>
注:
1.有可能你会为了可读，将操作符和元素都用空格分开，比如:```(header > ul.nav > li*5) + footer```这将不会工作，因为空格是Emmet停止缩写解析的标志
2.尽量构建简单的缩写，不容易错误而且快速
3.剩下的就靠开发者自己读了，实际上上面这些对于初中级开发者已经够了
</font>

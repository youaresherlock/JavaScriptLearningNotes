//字面量表示法创建对象 利用原生js处理事件时用js对象封装有关浏览器兼容的方法
var EventsUtility = {
    addEvent: function(element, type, callback){
        if(typeof addEventListener !== "undefined") {
            element.addEventListener(type, callback, false); //事件冒泡
        } else if(typeof attachEvent !== "undefined") {
            //适合IE 9之前的浏览器绑定事件
            element.attachEvent('on' + type, callback); // IE, legacy browser
        } else {
            //都不支持可以使用dom 0级事件
            element['on' + type] = callback;
        }
    },

    removeElement: function(element, type, callback){
        if(typeof removeEventListener !== "undefined") {
            element.removeEventListener(type, callback, false);
        } else if(typeof detachEvent !== "undefined"){
            element.detachEvent('on' + type, callback); // IE, legacy browser
        } else {
            element['on' + type] = null; 
        }
    },

    /*
    javascript创建对象的三种方式
    Object形式的自定义对象
     var 对象名 = new Object(); //new一个空的对象
     //对象.属性名 = 值; //给对象实例添加一个属性
     //对象名.函数名 = function(){} //给对象实例添加一个方法
     // js对象的属性访问:
     //对象.属性名
    对象字面量表示法
     var 对象名 = {
         //属性名: 值 //给对象添加属性
         //属性名(函数名) : function() {} //给对象添加方法
     }
     构造函数法:
     //function形式的自定义独享(在Js中函数即是对象)
     //function 对象名(){
         //this.属性名 = 值; //给对象添加属性
         //this.函数名 = function(){}//给对象添加方法
     //}
     // var 变量名 = new 对象名() //创建一个对象实例
     // 变量名.属性名
     */
    //获取事件对象
    getTarget: function(event) {
        if(typeof event.target !== "undefined"){
            return event.target;
        } else {
            return event.srcElement; // IE, legacy browser
        }
    },
    //取消事件的默认动作
    preventDefault: function(event) {
        if(typeof event.preventDefault !== "undefined") {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    /*
    In a keypress event, the Unicode value of the key pressed is stored 
    in either the keyCode or charCode property, but never both.  
    charCode返回onkeypress事件触发键值的字母代码
    keyCode返回onkeydown或onkeyup事件的键的代码
    */
    getCharCode: function(event) {
        if(typeof event.charCode === "number") {
            return event.charCode;
        } else {
            return event.keyCode; //IE, legacy browser
        }
        // e = event || window.event;
        // if(e.which == null) {
        //     e.which = e.charCode != null ? e.charode : e.keyCode;
        // }
    }
}
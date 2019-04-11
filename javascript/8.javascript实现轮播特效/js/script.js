//封装一个代替getElementById()的方法
function byId(id){
   return typeof(id) === "string" ? document.getElementById(id) : id;
}

var index = 0, 
    timer = null,
    pics = byId("banner").getElementsByTagName("div"),
    dots = byId("dots").getElementsByTagName("span"),
    prev = byId("prev"),
    next = byId("next"),
    len = pics.length,
    menu = byId("menu-content"),
    subMenu = byId("sub-menu"),
    innerBox = subMenu.getElementsByClassName("inner-box"),
    // getElementsByClassName()方法返回文档中所有指定类名的元素集合
    //IE8及以下浏览器不支持这种方法
    menuItems = menu.getElementsByClassName("menu-item");

function slideImg(){
    var main = byId("main");
    //鼠标指针移动到指定的元素上时发生, 则清除定时器，离开继续
    main.onmouseover = function() {
        if(timer) clearInterval(timer);
    }
    main.onmouseout = function() {
        timer = setInterval(function() {
            index ++;
            if(index >= len) {
                index = 0;
            }
            //切换图片
            changeImg();
        }, 3000);
    }
    main.onmouseout(); // 自动在main上触发鼠标离开的事件

    //遍历所有圆点，且绑定点击事件，点击圆点切换图片
    for(var j = 0; j < len; j++) {
        // 给所有span添加一个id的属性，值为j,作为当前span的索引
        dots[j].id = j;
        dots[j].onclick = function() {
            index = this.id;
            changeImg();
        }
    }

    //下一张
    next.onclick = function() {
        index++;
        if(index >= len) index = 0;
        changeImg();
    }

    //上一张
    prev.onclick = function() {
        index --;
        if(index < 0) index = len - 1;
        changeImg(); 
    }

    // 导航菜单
    //遍历主菜单，且绑定事件
    for(var k = 0; k < menuItems.length; k++) {
        menuItems[k].setAttribute("data-index", k); //非标准属性不能直接使用element.xx   
        menuItems[k].onmouseover = function() {
            // 给每一个menu-item定义data-index属性，作为索引
            var idx = this.getAttribute("data-index");
            subMenu.className = "sub-menu";//将子菜单hide类去掉，显示
            //鼠标滑过时隐藏所有的div.inner-box,然后指定div.inner-box显示出来
            for(var m = 0; m < menuItems.length; m++){
                if(m == idx){
                    innerBox[idx].style.display = "block";
                    //将鼠标指向的主菜单中的菜单项背景设置，便于查看
                    menuItems[m].style.background = "rgba(0, 0, 0, 0.1)";
                    continue;
                }
                innerBox[m].style.display = "none";
                menuItems[m].style.background = "none";
            }
        }

        menu.onmouseout = function() {
            subMenu.className = "sub-menu hide";
        }

        //鼠标滑出div.menu主菜单，滑入div.sub-menu子菜单，则继续显示
        subMenu.onmouseover = function() {
            this.className = "sub-menu";
        }

        //鼠标滑出子菜单本身也需要隐藏
        subMenu.onmouseout = function() {
            this.className = "sub-menu hide";
        }
    }
}

//切换图片
function changeImg(){
    // 遍历banner下所有的div及dots下所有的span,将div隐藏,将span清除类
    for(var i = 0; i < len; i++){
        pics[i].style.display = "none";
        dots[i].className = "";
    }
    // 根据index索引找到当前div和当前span,将其显示出来
    pics[index].style.display = "block";
    dots[index].className = "active";
}

slideImg();


function waterfall(wrap, boxes){
    // 每个图片盒子宽度是相同的，取到盒子的宽度
    /*boxes[0].style.width是个string对象
    另外行内属性，用style.width与offsetWidth都可以获得宽度值,前者带单位输出string，
    后者不带单位输出number, 当width的值不设置在行内样式上，而是设置在css中的时候，这时
    js中用style.width是获取不到宽度的，offsetWidth可以
    style.width是定义的width属性值,offsetWidth是padding+border+width属性值之和，不包括margin*/
   var boxWidth = boxes[0].offsetWidth + 20;
   var windowWidth = document.documentElement.clientWidth;
//    获取屏幕可以显示的列数
   var colsNumber = Math.floor(windowWidth / boxWidth);

   // 设置容器的宽度 会自动居中 因为margin-right margin-left都是auto
   wrap.style.width = boxWidth * colsNumber + "px"; 

   // 定义一个数组并存储每一列的高度
   var everyHeight = new Array();
   for(var i = 0; i < boxes.length; i++) {
       if(i < colsNumber) {
           everyHeight[i] = boxes[i].offsetHeight + 20;
       } else {
           // 计算当前列中的最小高度，向其添加盒子
           var minHeight = Math.min.apply(null, everyHeight);
           var minIndex = getIndex(minHeight, everyHeight);
           var leftValue = boxes[minIndex].offsetLeft - 10;
           boxes[i].style.position = "absolute";
        //    style.xxx是string类型，要带单位浏览器才能识别
           boxes[i].style.top = minHeight + 'px';
           boxes[i].style.left = leftValue + 'px';
        //   更新加入盒子的列的高度值
           everyHeight[minIndex] += boxes[i].offsetHeight + 20;
       }
   }
};

//获取最小列的索引
function getIndex(minHeight, everyHeight) {
    for(index in everyHeight) {
        if(everyHeight[index] == minHeight) {
            return index;
        }
    }
}

window.onload = function() {
    var wrap = document.getElementById('wrap');
    var boxes = wrap.getElementsByTagName('div');
    waterfall(wrap, boxes);    
};
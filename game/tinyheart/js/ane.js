var aneObj = function() {
    // start point, control point, end point(sin) 
    // quadraticCurveTo()绘制一条二次贝瑟尔曲线
    this.rootx = [];
    this.headx = []; // end point,通过sin函数控制来回摆动
    this.heady = [];
    this.amp = []; //正弦振幅范围
    this.alpha = 0; //正弦函数参数
}
aneObj.prototype.num = 50;
aneObj.prototype.init = function() {
    var h = can1.height;
    for(var i = 0; i < this.num; i++) {
        this.rootx[i] = i * 16 + Math.random() * 20 //[0, 1)
        this.headx[i] = this.rootx[i];
        this.heady[i] = h - 220 + Math.random() * 50;
        this.amp[i] = Math.random() * 50 + 50;
    }
}
aneObj.prototype.draw = function() {
    this.alpha += deltaTime * 0.0008;
    var l = Math.sin(this.alpha);
    ctx2.save(); // 保存当前环境的状态
    ctx2.globalAlpha = 0.6;
    ctx2.lineWidth = 20;
    ctx2.lineCap = "round";
    ctx2.strokeStyle = "#3b154e";
    for(var i = 0; i < this.num; i++) {
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i], canHeight);
        // x坐标不断在this.rootx[i]左右震荡
        this.headx[i] = this.rootx[i] + l * this.amp[i]; 
        ctx2.quadraticCurveTo(this.rootx[i], canHeight - 100, this.headx[i] , this.heady[i]);
        ctx2.stroke();
    }
    ctx2.restore(); //返回之前保存过的路径状态和属性
}
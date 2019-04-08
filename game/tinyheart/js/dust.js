var dustObj = function() {
    this.x = [];
    this.y = [];
    this.amp = [];
    this.number = [];

    this.alpha; // 悬浮物摇摆角度
}
dustObj.prototype.num = 30;
dustObj.prototype.init = function() {
    for(var i = 0; i < this.num; i++) {
        // 随机分布在画布上
        this.x[i] = Math.random() * canWidth;
        this.y[i] = Math.random() * canHeight;
        this.amp[i] = 20 + Math.random() * 25; //振幅
        this.number[i] = Math.floor(Math.random() * 7); // 随机图片资源
    }
    this.alpha = 0; //初始角度
}
dustObj.prototype.draw = function() {
    this.alpha += deltaTime * 0.0008;
    var l = Math.sin(this.alpha);
    for(var i = 0; i < this.num; i++) {
        var no = this.number[i];
        ctx1.drawImage(dustPic[no], this.x[i] + l * this.amp[i], this.y[i]);
    }
}
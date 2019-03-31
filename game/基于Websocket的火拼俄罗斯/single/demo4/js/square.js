var Square = function() {
    // 方块数据
    this.data = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    // 原点
    this.origin = {
        x: 0, 
        y: 0
    };
    //方向 旋转数组中的索引
    this.dir = 0;
}
// 判断方块是否可以下降(可能会被挡住，或者超过game底边界限)
/* propotype属性允许你向对象添加属性和方法 object.prototype.name = value
函数对象(通过 new Function()创建的对象,其他的都是普通对象)的一个属性就是原型对象prototype
js在创建对象(不论是普通对象还是函数对象)的时候，都有一个叫做__proto__的内置属性，用于指向
创建它的函数对象的原型对象prototype.
var Square = new Square(); Square是函数对象,Square是普通对象 
console.log(Square.__proto__ === Square.prototype); //true
console.log(Square.prototype.__proto__ === Object.prototype); //true
Square构造方法创建对象缺点是重复创建对象的方法，每次创建一个对象时，都会重复创建它的getName方法，
造成一定的内存浪费
而下面原方式添加属性和方法可以被多个对象共享，不需要重复创建方法(因为参数是固定的)
 */
// 下移
Square.prototype.canDown = function(isValid) {
    var test = {};
    test.x = this.origin.x + 1;
    test.y = this.origin.y;
    return isValid(test, this.data);
}
Square.prototype.down = function() {
    this.origin.x = this.origin.x + 1;
}
// 左移
Square.prototype.canLeft = function(isValid) {
    var test = {};
    test.x = this.origin.x;
    test.y = this.origin.y - 1;
    return isValid(test, this.data);
}
Square.prototype.left = function() {
    this.origin.y = this.origin.y - 1;
}
// 右移
Square.prototype.canRight = function(isValid) {
    var test = {};
    test.x = this.origin.x;
    test.y = this.origin.y + 1;
    return isValid(test, this.data);
}
Square.prototype.right = function() {
    this.origin.y = this.origin.y + 1;
}
//旋转
Square.prototype.canRotate = function(isValid) {
    var d = (this.dir + 1) % 4;
    var test = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    for(var i = 0; i < this.data.length; i++) {
        for(var j = 0; j < this.data[0].length; j++) {
            test[i][j] = this.rotates[d][i][j];
        }
    }
    return isValid(this.origin, test);
}
Square.prototype.rotate = function(num) {
    if(!num) num = 1;
    this.dir = (this.dir + num) % 4;
    for(var i = 0; i < this.data.length; i++) {
        for(var j = 0; j < this.data[0].length; j++) {
            this.data[i][j] = this.rotates[this.dir][i][j];
        }
    }
}
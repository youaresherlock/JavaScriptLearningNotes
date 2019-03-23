var Square1 = function() {
    /*
    每个函数都包含两个非继承而来的方法apply()和call(),在特定的作用域中调用函数
    apply()接受两个参数，一个是函数运行的作用域(this),另一个是参数数组. call()方法
    第一个参数与apply()方法相同，但传递给函数的参数必须列举出来
    this表示当前执行的上下文
    this一般情况下，都是指向函数的拥有者
    this一定是指向当前调用函数的对象的
    比如Square1中加入this.say = function..., 函数中的this,就是当前对象，也就是调用say的对象
    Square1中直接打印this就是Window对象,因为函数默认是window的全局函数，由window来调用
    */
    Square.call(this);
    // 旋转数组 四种旋转状态
    this.rotates = [
        [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [2, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [2, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
}
Square1.prototype = Square.prototype;

var Square2 = function() {
    Square.call(this);
    // 旋转数组 四种旋转状态
    this.rotates = [
        [
            [0, 2, 0, 0],
            [2, 2, 2, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 0, 0, 0],
            [2, 2, 0, 0],
            [2, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 2, 2, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 0, 0],
            [2, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
}
Square2.prototype = Square.prototype;

var Square3 = function() {
    Square.call(this);
    // 旋转数组 四种旋转状态
    this.rotates = [
        [
            [2, 2, 2, 0],
            [0, 0, 2, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 0, 0, 0],
            [2, 2, 2, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 2, 0, 0],
            [2, 0, 0, 0],
            [2, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
}
Square3.prototype = Square.prototype;

var Square4 = function() {
    Square.call(this);
    // 旋转数组 四种旋转状态
    this.rotates = [
        [
            [2, 2, 2, 0],
            [2, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 2, 0],
            [2, 2, 2, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 0, 0, 0],
            [2, 0, 0, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
}
Square4.prototype = Square.prototype;

var Square5 = function() {
    Square.call(this);
    // 旋转数组 四种旋转状态
    this.rotates = [
        [
            [2, 2, 0, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 2, 0, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 2, 0, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 2, 0, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
}
Square5.prototype = Square.prototype;

var Square6 = function() {
    Square.call(this);
    // 旋转数组 四种旋转状态
    this.rotates = [
        [
            [0, 2, 2, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 0, 0, 0],
            [2, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 2, 0],
            [2, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 0, 0, 0],
            [2, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
}
Square6.prototype = Square.prototype;

var Square7 = function() {
    Square.call(this);
    // 旋转数组 四种旋转状态
    this.rotates = [
        [
            [2, 2, 0, 0],
            [0, 2, 2, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 0, 0],
            [2, 2, 0, 0],
            [2, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [2, 2, 0, 0],
            [0, 2, 2, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 0, 0],
            [2, 2, 0, 0],
            [2, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
}
Square7.prototype = Square.prototype;

//创建工厂类 
var SquareFactory = function() {}
//  index: 七种方块的种类   dir: 表示当前方块的旋转分量 每种方块有四种方块
SquareFactory.prototype.make = function(index, dir) {
    var s = null;
    // index从0开始索引
    index = index + 1;
    switch(index) {
        case 1:
            s = new Square1();
            break;
        case 2:
            s = new Square2();
            break;
        case 3:
            s = new Square3();
            break;
        case 4:
            s = new Square4();
            break;
        case 5:
            s = new Square5();
            break;
        case 6:
            s = new Square6();
            break;
        case 7:
            s = new Square7();
            break;
        default: break;
    }
    s.origin.x = 0;
    s.origin.y = 3;
    s.rotate(dir);
    return s;
}
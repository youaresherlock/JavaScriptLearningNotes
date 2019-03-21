var Local = function() {
    //游戏对象
    var game;
    // 事件间隔
    var INTERVAL = 200;
    // 定时器
    var timer = null;
    //  绑定键盘事件
    var bindKeyEvent = function() {
        document.onkeydown = function(e) {
            if(e.keyCode == 38) { //up 旋转
                game.rotate();
            } else if(e.keyCode == 39) { // right
                game.right();
            } else if(e.keyCode == 40) { // down
                game.down();
            } else if(e.keyCode == 37) { // left
                game.left();
            } else if(e.keyCode == 32) { // space 坠落
                game.fall();
            }
        }
    };
    // 移动
    var move = function() {
        if(!game.down()) {
            game.fixed();
            game.checkClear();
            var gameOver = game.checkGameOver();
            if(gameOver) {
                stop();
            } else {
                // 下一个方块的种类，下一个方块的旋转次数
                game.performNext(generateType(), generateDir());
            }
        }
    }
    // 随机生成一个方块种类
    var generateType = function() {
       return  Math.ceil(Math.random() * 7) - 1; // [0, 6]
    }
    // 随机生成一个旋转次数
    var generateDir = function() {
        // Math.random() [0, 1) 向上取整
       return  Math.ceil(Math.random() * 4) - 1; // [0, 3]
    }
    // 开始
    var start = function() {
        var doms = {
            gameDiv: document.getElementById('game'),
            nextDiv: document.getElementById('next')
        };
        game = new Game();
        game.init(doms);
        bindKeyEvent();
        timer = setInterval(move, INTERVAL);
    };
    //结束
    var stop = function() {
        // 清除定时器
        if(timer) {
            clearInterval(timer); 
            timer = null;
        }
        // 清除键盘事件
        document.onkeydown = null;
    }
    //导出API
    this.start = start;
}
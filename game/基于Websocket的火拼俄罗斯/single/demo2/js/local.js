var Local = function() {
    //游戏对象
    var game;
    // 事件间隔
    var INTERVAL = 200;
    // 定时器
    var timer = null;
    // 时间计数器
    var timeCount = 0;
    // 时间
    var time = 0;
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
        };
    };
    // 移动
    var move = function() {
        timeFunc();
        if(!game.down()) {
            game.fixed();
            var line = game.checkClear();
            if(line) {
                game.addScore(line);
                var allscore = document.getElementById("allscore");
                console.log(allscore);
                if(allscore.classList.contains("play")) {
                    allscore.className = "restart";
                } else {
                    allscore.className = "play";
                }
            }
            var gameOver = game.checkGameOver();
            if(gameOver) {
                game.gameover(false);
                stop();
            } else {
                // 下一个方块的种类，下一个方块的旋转次数
                game.performNext(generateType(), generateDir());
            }
        }
    }
    // 计时函数
    var timeFunc = function() {
        timeCount = timeCount + 1;
        if(timeCount == 5) {
            timeCount = 0;
            time = time + 1;
            game.setTime(time);
            if(time % 10 == 0) {
                game.addTailLines(generateBottomLine(1));
            }
        }
    }
    // 随机生成干扰行
    var generateBottomLine = function(lineNum) {
        var lines = [];
        for(var i = 0; i < lineNum; i++) {
            var line = [];
            for(var j = 0; j < 10; j++) {
                // 随机生成0,1
                line.push(Math.ceil(Math.random() * 2) - 1);
            }
            lines.push(line);
        }
        return lines;
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
            nextDiv: document.getElementById('next'),
            timeDiv: document.getElementById('time'),
            scoreDiv: document.getElementById('score'),
            resultDiv: document.getElementById("gameover")
        };
        game = new Game();
        game.init(doms, generateType(), generateDir());
        bindKeyEvent();
        game.performNext(generateType(), generateDir());
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
        var alltime = document.getElementById("alltime");
        alltime.className = "";
    }
    //导出API
    this.start = start;
}
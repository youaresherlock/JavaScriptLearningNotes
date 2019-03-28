var Local = function(socket) {
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
                socket.emit('rotate');
            } else if(e.keyCode == 39) { // right
                game.right();
                socket.emit('right');
            } else if(e.keyCode == 40) { // down
                game.down();
                socket.emit('down');
            } else if(e.keyCode == 37) { // left
                game.left();
                socket.emit('left');
            } else if(e.keyCode == 32) { // space 坠落
                game.fall();
                socket.emit('fall');
            }
        };
    };
    // 移动
    var move = function() {
        timeFunc();
        if(!game.down()) {
            game.fixed();
            socket.emit('fixed');
            var line = game.checkClear();
            if(line) {
                game.addScore(line);
                socket.emit('line', line);
                // 根据己方消行数量来给对方添加干扰line行
                if(line > 1) {
                    var bottomLines = generateBottomLine(line);
                    socket.emit('bottomLines', bottomLines);
                }
            }
            var gameOver = game.checkGameOver();
            if(gameOver) {
                game.gameover(false);
                // 客户端之一输掉游戏会通知对方
                document.getElementById("remote_gameover").innerHTML = "你赢了!";
                socket.emit('lose');
                stop();
            } else {
                // 下一个方块的种类，下一个方块的旋转次数
                var t = generateType();
                var d = generateDir();
                game.performNext(t, d);
                socket.emit('next', {type: t, dir: d});
            }
        } else {
            socket.emit('down');
        }
    }
    // 计时函数
    var timeFunc = function() {
        timeCount = timeCount + 1;
        if(timeCount == 5) {
            timeCount = 0;
            time = time + 1;
            game.setTime(time);
            // 同步双方时间
            socket.emit('time', time);
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
            gameDiv: document.getElementById('local_game'),
            nextDiv: document.getElementById('local_next'),
            timeDiv: document.getElementById('local_time'),
            scoreDiv: document.getElementById('local_score'),
            resultDiv: document.getElementById("local_gameover")
        };
        game = new Game();
        var type = generateType();
        var dir = generateDir();
        game.init(doms, type, dir);
        socket.emit('init', {type: type, dir: dir});
        bindKeyEvent();
        var t = generateType();
        var d = generateDir();
        game.performNext(t, d);
        socket.emit('next', {type: t, dir: d});
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
    };

    socket.on('start', function() {
        document.getElementById('waiting').innerHTML = '';
        start();
    });

    // 对方发送他已经输了的消息
    socket.on('lose', function() {
        game.gameover(true);
        stop();
    });

    socket.on('leave', function() {
        document.getElementById('local_gameover').innerHTML = '对方掉线';
        document.getElementById('remote_gameover').innerHTML = '已掉线';
        stop();
    });

    socket.on('bottomLines', function(data) {
        game.addTailLines(data);
        socket.emit('addTailLines', data);
    });
}
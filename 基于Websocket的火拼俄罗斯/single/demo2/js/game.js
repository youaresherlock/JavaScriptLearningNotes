var Game = function() {
    //dom元素
    var gameDiv;
    var nextDiv;
    var timeDiv;
    var scoreDiv;
    // 分数
    var score = 0;
    // 游戏矩阵
    // 20*10
    var gameData = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
    // 当前方块
    var cur;
    // 下一个方块
    var next;
    // divs
    var nextDivs = [];
    var gameDivs = [];
    // 初始化div 初始化game和next游戏区域div
    var initDiv = function(container, data, divs) {
        // 外循环是20,内循环是10，将所有的盒子填充到game盒子中
        for(var i = 0; i < data.length; i++) {
            var div = [];
            for(var j = 0; j < data[0].length; j++) {
                var newNode = document.createElement('div');
                newNode.className = 'none';
                newNode.style.top = (i * 20) + 'px';
                newNode.style.left = (j * 20) + 'px';
                container.appendChild(newNode);
                div.push(newNode);
            }
            divs.push(div);
        }
    };
    //刷新div,更改div的class
    var refreshDiv = function(data, divs) {
        for(var i = 0; i < data.length; i++) {
            for(var j = 0; j < data[0].length; j++) {
                if(data[i][j] == 0) {
                    divs[i][j].className = "none";
                } else if(data[i][j] == 1) {
                    divs[i][j].className = "done";
                } else if(data[i][j] == 2) {
                    divs[i][j].className = "current";
                }
            }
        }
    };
    // 检测点是否合法
    var check = function(pos, x, y) {
        if(pos.x + x < 0) {
            return false;
        } else if(pos.x + x >= gameData.length) {
            return false;
        } else if(pos.y + y < 0) {
            return false;
        } else if(pos.y + y >= gameData[0].length) {
            return false;
        } else if(gameData[pos.x + x][pos.y + y] == 1) {
            return false;
        } else {
            return true;
        }
    }
    // 检测方块数据是否合法
    var isValid = function(pos, data) {
        for(var i = 0; i < data.length; i++) {
            for(var j = 0; j < data[0].length; j++) {
                if(data[i][j] != 0){
                    if(!check(pos, i, j)) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    // 清除之前正在下落的方块数据
    var clearData= function() {
        for(var i = 0; i < cur.data.length; i++) {
            for(var j = 0; j < cur.data[0].length; j++) {
                if(check(cur.origin, i, j)) {
                    // 防止数组越界、正下落的方块的空白区域不会覆盖已落下的方块
                    gameData[cur.origin.x + i][cur.origin.y + j] = 0;
                }
            }
        }
    };
    // 设置数据
    var setData= function() {
        for(var i = 0; i < cur.data.length; i++) {
            for(var j = 0; j < cur.data[0].length; j++) {
                if(check(cur.origin, i, j)) {
                    // 防止数组越界、正下落的方块的空白区域不会覆盖已落下的方块
                    gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
                }
            }
        }
    };
    // 下移
    var down = function() {
        if(cur.canDown(isValid)) {
            clearData();
            cur.down();
            setData();
            refreshDiv(gameData, gameDivs);
            return true;
        } else {
            return false;
        }
    };
    // 左移
    var left = function() {
        if(cur.canLeft(isValid)) {
            clearData();
            cur.left();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    };
    // 右移
    var right = function() {
        if(cur.canRight(isValid)) {
            clearData();
            cur.right();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    };
    // 旋转
    var rotate = function() {
        if(cur.canRotate(isValid)) {
            clearData();
            cur.rotate();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    };
    // 方块移动到底部，给它固定
    var fixed = function() {
        for(var i = 0; i < cur.data.length; i++) {
            for(var j = 0; j < cur.data[0].length; j++) {
                if(check(cur.origin, i, j)) {
                    if(gameData[cur.origin.x + i][cur.origin.y + j] == 2) {
                        gameData[cur.origin.x + i][cur.origin.y + j] = 1;
                    }
                }
            }
        }
        refreshDiv(gameData, gameDivs);
    };
    // 消行 从gameData底部从上扫描，消行，下移几行然后填充0
    var checkClear = function() {
        var line = 0;
        for(var i = gameData.length - 1; i >= 0; i--) {
            var clear = true;
            for(var j = 0; j < gameData[0].length; j++) {
                if(gameData[i][j] != 1) {
                    clear = false;
                    break;
                }
            }
            if(clear) {
                line = line + 1;
                // i是要消除的行,将i以上的所有行下移，最上面一行填充0
                for(var m = i; m > 0; m--){
                    for(var n = 0; n < gameData[0].length; n++) {
                        gameData[m][n] = gameData[m-1][n];
                    }
                }
                for(var n = 0; n < gameData[0].length; n++) {
                    gameData[0][n] = 0;
                }
                i++;
            }
        } 
        return line;
    }
    // 使用下一个方块
    var performNext = function(type, dir) {
        cur = next;
        setData();
        next = SquareFactory.prototype.make(type, dir);
        refreshDiv(gameData, gameDivs);
        refreshDiv(next.data, nextDivs);
    }
    // 检车游戏结束
    var checkGameOver = function() {
        var gameOver = false;
        for(var i = 0; i < gameData[0].length; i++) {
            if(gameData[1][i] == 1) {
                gameOver = true;
            }
        }
        return gameOver;
    }
    // 初始化
    var init = function(doms, type, dir) {
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        timeDiv = doms.timeDiv;
        scoreDiv = doms.scoreDiv;
        next = SquareFactory.prototype.make(type, dir);
        initDiv(gameDiv, gameData, gameDivs);
        initDiv(nextDiv, next.data, nextDivs);
        refreshDiv(next.data, nextDivs);
    };
    // 设置时间
    var setTime = function(time) {
        timeDiv.innerHTML = time;
    };
    // 加分
    var addScore = function(line) {
        var s = 0;
        switch(line) {
            case 1: 
                s = 10;
                break;
            case 2:
                s = 30;
                break;
            case 3: 
                s = 60;
                break;
            case 4:
                s = 100;
                break;
            default:
                break;
        }
        score = score + s;
        scoreDiv.innerHTML = score;
    };
    // 导出API
    this.init = init;
    this.down = down;
    this.left = left;
    this.right = right;
    this.rotate = rotate;
    this.fall = function() {while(down());};
    this.fixed = fixed;
    this.performNext = performNext;
    this.checkClear = checkClear;
    this.checkGameOver = checkGameOver;
    this.setTime = setTime;
    this.addScore = addScore;
}
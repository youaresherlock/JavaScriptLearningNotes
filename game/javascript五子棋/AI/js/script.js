// 二维数组，标记棋盘的使用，黑棋为1，白旗为2，空为0
var chessBoard = [];
var me = true;
var over = false;

// 赢法数组
var wins = [];
// 赢法的统计数组
var myWin = [];
var computerWin = [];

for(var i = 0; i < 15; i++) {
    wins[i] = [];
    for(var j = 0; j < 15; j++) {
        wins[i][j] = [];
    }
}

// 赢法种类索引
var count = 0;
// 所有的横线赢法
for(var i = 0; i < 15; i++) {
    for(var j = 0; j < 11; j++) {
        for(var k = 0; k < 5; k++) {
            wins[i][j+k][count] = true;
        }
        count ++;
    }
}
//所有竖线赢法
for(var i = 0; i < 15; i++) {
    for(var j = 0; j < 11; j++) {
        for(var k = 0; k < 5; k++) {
            wins[j + k][i][count] = true;
        }
        count ++;
    }
}
//所有斜线赢法
/*
算法解释:
内层循环5次,可以表示每一种count情况下的赢法
次外层循环11次，因为都是在同一横坐标下,因此
都是平行的11次斜线胜利情况,最外层11次,可以处理
从下一个横坐标开始的11条赢法.
 */ 
for(var i = 0; i < 11; i++) {
    for(var j = 0; j < 11; j++) {
        for(var k = 0; k < 5; k++) {
            wins[i + k][j + k][count] = true;
        }
        count ++;
    }
}
//所有反斜线
for(var i = 0; i < 11; i++) {
    for(var j = 14; j > 3; j--) {
        for(var k = 0; k < 5; k++) {
            wins[i + k][j - k][count] = true;
        }
        count ++;
    }
}
// console.log(count) 一共有572种赢法

for(var i = 0; i < count; i++) {
    myWin[i] = 0;
    computerWin[i] = 0;
}

for(var i = 0; i < 15; i ++) {
    chessBoard[i] = [];
    for(var j = 0; j < 15; j++) {
        chessBoard[i][j] = 0;
    }
}

var chess = document.getElementById("chess");
var context = chess.getContext("2d");

context.strokeStyle = "#bfbfbf";

var logo = new Image();
logo.src = "images/fire.png";
// onload事件在图片加载完成后立即执行,执行完毕后绘制棋盘
logo.onload = function() {
    context.drawImage(logo, 0, 0, 450, 450);
    drawChessBoard();
};

var drawChessBoard = function() {
// 棋盘大小是14*14大小，每个格子30px,两边留白是(450-14*30)/2 = 15px
    for(var i = 0; i < 15; i++) {
        context.moveTo(15, 15 + i * 30);
        context.lineTo(435, 15 + i * 30);
        context.stroke();
        context.moveTo(15 + i * 30, 15);
        context.lineTo(15 + i * 30, 435);
        context.stroke();
    }
};

//i,j表示棋子的位置
var oneStep = function(i, j, me) {
    context.beginPath();
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
    // createRadialGradient()方法创建放射状/圆形渐变对象.渐变可用于填充矩形、线条等等
    // 渐变中心右上角,+2, -2
    var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
    if(me) {
        gradient.addColorStop(0, "#0A0A0A");
        gradient.addColorStop(1, "#636766");
    } else {
        gradient.addColorStop(0, "#D1D1D1");
        gradient.addColorStop(1, "#F9F9F9");
    }
    context.fillStyle = gradient;
    context.fill();
}

chess.onclick = function(e) {
    if(over) {
        return;
    }
    // 只有我方可以触发点击事件,AI部分会在我方下棋之后自动执行
    if(!me) {
        return;
    }
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    // 只有空的位置才可以设置棋子
    if(chessBoard[i][j] == 0) {
        oneStep(i, j, me);
        chessBoard[i][j] = 1;
        // if(me) {
        //     chessBoard[i][j] = 1;
        // } else {
        //     chessBoard[i][j] = 2;
        // }
        for(var k = 0; k < count; k++) {
            if(wins[i][j][k]) {
                myWin[k]++; 
                // 这种走法计算机不可能赢
                computerWin[k] = 6;
                if(myWin[k] == 5) {
                    window.alert("你赢了");
                    over = true;
                }
            }
        }
        if(!over) {
            me = !me;
            computerAI();
        }
    } 
}

var computerAI = function() {
    // 计算棋盘上所有空的位置计算得分
    var myScore = [];
    var computerScore = [];
    // 保存最高分
    var max = 0;
    // 最高分数点的坐标
    var u = 0 ,v = 0;
    for(var i = 0; i < 15; i++) {
        myScore[i] = [];
        computerScore[i] = [];
        for(var j = 0; j < 15; j++) {
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }
    for(var i = 0; i < 15; i++) {
        for(var j = 0; j < 15; j++) {
            if(chessBoard[i][j] == 0) {
                for(var k = 0; k < count; k++) {
                    // 在i,j点落子可能有价值,根据对方的赢法统计数组计算拦截的价值
                    if(wins[i][j][k]) {
                        if(myWin[k] == 1) {
                            myScore[i][j] += 200;
                        } else if(myWin[k] == 2) {
                            myScore[i][j] += 400;
                        } else if(myWin[k] == 3) {
                            myScore[i][j] += 2000; //很大可能要进行拦截
                        } else if(myWin[k] == 4) {
                            myScore[i][j] += 10000; //自己下一步不能成5，必须拦截
                        }

                        if(computerWin[k] == 1) {
                            computerScore[i][j] += 220;
                        } else if(computerWin[k] == 2) {
                            computerScore[i][j] += 420;
                        } else if(computerWin[k] == 3) {
                            computerScore[i][j] += 2100; //2100 < 10000, 最好接着下
                        } else if(computerWin[k] == 4) {
                            computerScore[i][j] += 22000; //如果计算机已经4颗了,因此接着下获胜
                        }
                    }
                }

                // 更新myScore的最高分,并记录其下的点
                if(myScore[i][j] > max) {
                    max = myScore[i][j];
                    u = i; 
                    v = j;
                } else if(myScore[i][j] == max) {
                    if(computerScore[i][j] > computerScore[u][v]) {
                        u = i; 
                        v = j;
                    }
                }
                // 将计算机分数与我方分数对比，保存最高分,记录要下的点(拦截或进攻)
                if(computerScore[i][j] > max) {
                    max = computerScore[i][j];
                    u = i; 
                    v = j;
                } else if(computerScore[i][j] == max) {
                    if(myScore[i][j] > myScore[u][v]) {
                        u = i; 
                        v = j;
                    }
                }
            }
        }
    }
    oneStep(u, v, false);
    chessBoard[u][v] = 2;

    for(var k = 0; k < count; k++) {
        if(wins[u][v][k]) {
            computerWin[k]++; 
            // 这种赢法对方不可能赢
            myWin[k] = 6;
            if(computerWin[k] == 5) {
                // window.alert("计算机赢了"); 让alert异步执行,先绘制好棋子
                setTimeout("alert('计算机赢了');doSomething();", 0);
                over = true;
            }
        }
    }
    if(!over) {
       me = !me;
    }
};
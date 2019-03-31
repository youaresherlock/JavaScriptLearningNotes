// 二维数组，标记棋盘的使用，黑棋为1，白旗为2，空为0
var chessBoard = [];
var me = true;

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
    context.arc(15 + i * 30, 15 + j * 30, 15, 0, 2 * Math.PI);
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
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    // 只有空的位置才可以设置棋子
    if(chessBoard[i][j] == 0) {
        if(me) {
            chessBoard[i][j] = 1;
        } else {
            chessBoard[i][j] = 2;
        }
        oneStep(i, j, me);
        me = !me;
    } 
}
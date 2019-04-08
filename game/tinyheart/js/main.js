document.body.onload = game;
var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;
var deltaTime; // 根据每次绘制的时间差调整物体的运动速度,这样看起来像匀速
var bgPic = new Image();

var ane;
var fruit;
var mom;
var baby;
var data;
var wave;
var halo;

var dust;
var dustPic = []; // 存放一系列悬浮物的图片

// 记录鼠标的位置
var mx;
var my;

// 小鱼尾巴图片数组
var babyTail = [];
// 小鱼眼睛数组
var babyEye = [];
// 小鱼身体数组
var babyBody = [];
// 大鱼尾巴数组
var momTail = [];
// 大鱼眼睛数组
var momEye = [];
// 大鱼橙黄色与蓝色身体数组
var momBodyOra = [];
var momBodyBlue = [];

function game() {
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();
}

function init() {
    //获取canvas context
    can1 = document.getElementById("canvas1"); //fishes, dust, UI,circle
    ctx1 = can1.getContext("2d");
    can2 = document.getElementById("canvas2"); //background, ane, fruits
    ctx2 = can2.getContext("2d");

    can1.addEventListener("mousemove", onMouseMove, false);

    bgPic.src = "./src/background.jpg";

    canWidth = can1.width;
    canHeight = can1.height;

    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();

    baby = new babyObj();
    baby.init();

    mx = canWidth * 0.5;
    my = canHeight * 0.5;

    for(var i = 0; i < 8; i++) {
        babyTail[i] = new Image();
        babyTail[i].src = "./src/babyTail" + i + ".png";
    }

    for(var i = 0; i < 2; i++) {
        babyEye[i] = new Image();
        babyEye[i].src = "./src/babyEye" + i + ".png";
    }

    for(var i = 0; i < 20; i++) {
        babyBody[i] = new Image();
        babyBody[i].src = "./src/babyFade" + i + ".png";
    }

    for(var i = 0; i < 8; i++) {
        momTail[i] = new Image();
        momTail[i].src = "./src/bigTail" + i + ".png";
    }

    for(var i = 0; i < 2; i++) {
        momEye[i] = new Image();
        momEye[i].src = "./src/bigEye" + i + ".png";
    }

    data = new dataObj();
    for(var i = 0; i < 8; i++) {
        momBodyOra[i] = new Image();
        momBodyBlue[i] = new Image();
        momBodyOra[i].src = "./src/bigSwim" + i + ".png";
        momBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";
    }
    // 只有在绘制分数font才会用到这些属性,可以提前初始化好
    ctx1.font = "20px Verdana";
    ctx1.textAlign = "center"; //left, center, right

    wave = new waveObj();
    wave.init();

    halo = new haloObj();
    halo.init();

    for(var i = 0; i < 7; i++) {
        dustPic[i] = new Image();
        dustPic[i].src = "./src/dust" + i + ".png";
    }
    dust = new dustObj();
    dust.init();

}

function gameloop() {
    requestAnimationFrame(gameloop); //setInterval, setTimeout, frame per second
    now = Date.now();
    deltaTime = now -lastTime;
    lastTime = now;
    if(deltaTime > 40) deltaTime = 40;

    background();
    ane.draw();
    fruitMonitor();
    fruit.draw();

    ctx1.clearRect(0, 0, canWidth, canHeight);
    mom.draw();
    momFruitsCollision();
    momBabyCollision();
    baby.draw();

    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();
}

function onMouseMove(e) {
    if(!data.gameOver) {
        if(e.offSetX || e.layerX) {
            mx = e.offSetX == undefined ? e.layerX : e.offSetX;
            my = e.offSetY == undefined ? e.layerY : e.offSetY;
        }
    }
}
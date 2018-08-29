var bgMusic = document.getElementById("bg-music");
var canvas = document.getElementById("newCanvas");
var ctx = canvas.getContext("2d");

canvas.width = document.getElementById("game-container").offsetWidth;
canvas.height = document.getElementById("game-container").offsetHeight;
var canvasW = canvas.width;
var canvasH = canvas.height;

var radius = 5;
var player, enemy;
var balls = [], img = [], bullets = [];
var sX = canvasW / 2, sY = canvasH / 5;
var count = 0, ballIndex = 0;
var sInter, fps, playerScore = 0;1
var enemyCd, isEnemyAlive, isMusicTriggered = false, isMusicMuted = false;
var audioIcon = document.getElementById("audio-icon");
var audioText = document.getElementById("audio-text");

function init(){
    loadBgMusic();
    onKeyDown();
    onKeyUp();

    player = new Player();
    lifeControl(player.life);
    
    enemyCd = 15;
    isEnemyAlive = false;

    run();
    fps = 1000 / 60;
    sInter = setInterval(run, fps);
}

function update(){
    if(!isEnemyAlive)
        enemyCd--;
    
    if(enemyCd == 0){
        isEnemyAlive = true;
        enemyCd = 15;

        enemy = new Enemy(canvasW / 2, -50, 2000, "Red Scarlet");
    }

    for(var i=bullets.length-1;i>=0;i--){
        bullets[i].move();
        if (bullets[i].isOut()) {
            bullets.splice(i, 1);
        }
    }

    if(isEnemyAlive){
        if(!enemy.entrance()){
            for(var i=balls.length-1;i>=0;i--){
                if(!balls[i].alive()){
                    balls.splice(i, 1);
                    continue;
                }
                
                balls[i].move();
                if (balls[i].isOut()) {
                    balls.splice(i, 1);
                }
            }
        }
    }

    if(player.isInvulnerable == true){
        player.invulnerableCd();
    }

    if(isEnemyAlive && !enemy.entrance()){
        for(var i=bullets.length-1;i>=0;i--){
            if(enemy.collisionDetect(bullets[i])){    
                if(!enemy.takeDamage(bullets[i])){
                    document.getElementById("enemy-hp").style.width = 100 + "%";
                    isEnemyAlive = false;
                    playerScore += 200000;
                    balls.splice(0, balls.length);
                }
                bullets.splice(i, 1);
            }
        }
    }

    for(var i=0;i<balls.length;i++){
        if(!player.collisionDetect(balls[i])){
            clearInterval(sInter);
            bgMusic.pause();
            bgMusic.currentTime = 0;
        }
    }
}

function run(){
    update();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#535c68";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);

    for(var i=bullets.length-1;i>=0;i--){
        bullets[i].draw(ctx);
    }

    for(var i=balls.length-1;i>=0;i--){
        balls[i].draw(ctx);
    }

    if(isEnemyAlive)
        enemy.draw(ctx);
    
    scoreManager();
    kd.tick();
}

init();
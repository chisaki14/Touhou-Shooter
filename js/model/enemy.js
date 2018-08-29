class Enemy{
    constructor(x, y, hp, name){
        this.x = x;
        this.y = y;
        this.r = 10;
        this.teleportCd = 100;
        this.speed = 1;
        this.hp = hp;

        this.height = 580 / 6;
        this.width = 260 / 2;

        this.patternState = 0;
        this.patterns = [];

        this.addPattern(new Pattern(1, 500));
        this.addPattern(new Pattern(3, 500));
        this.addPattern(new Pattern(5, 500));
        this.addPattern(new Pattern(4, 500));
        this.addPattern(new Pattern(2, 500));

        this.isTeleportIn = false;
        this.isTeleportOut = false;

        this.infoController = new EnemyInfoController(hp, name);
        this.spriteController = new EnemySpriteController("./assets/boss.png", 580 / 6, 260 / 2, 0, 0, 5);
    }

    addPattern(pattern){
        this.patterns.push(pattern);
        this.patterns.push(new Pattern(0, 50));
    }

    alive(){
        if(!this.entrance()){
            this.shoot();
        }

        if(this.isTeleportIn || this.isTeleportOut){
            this.spriteController.tick(this);
        }
    }

    shoot(){
        this.patterns[this.patternState].alive();
        if(this.patterns[this.patternState].cd == 0){
            if(this.patterns[this.patternState].type != 0)
                this.teleport();
            
            this.patterns[this.patternState].resetCd();
            this.patternState++;
            this.patternState %= this.patterns.length;
        }
    }

    teleport(){
        this.isTeleportIn = true;
    }

    entrance(){
        if(this.y >= canvasH / 5){
            return false;
        }
        
        this.y += this.speed;
        return true;
    }

    collisionDetect(bullet){
        var circleDistance = {};
        circleDistance.x = Math.abs(bullet.x - enemy.x);
        circleDistance.y = Math.abs(bullet.y - enemy.y);

        if (circleDistance.x > (this.width / 2 + bullet.r))
            return false;
        if (circleDistance.y > (this.height / 2 + bullet.r))
            return false;

        if (circleDistance.x <= (this.width / 2))
            return true;
        if (circleDistance.y <= (this.height / 2))
            return true;

        var cornerDistance_sq = (circleDistance.x - this.width/2) ^ 2 + (circleDistance.y - this.height/2) ^ 2;
        return (cornerDistance_sq <= (bullet.r ^ 2));
    }

    takeDamage(bullet){
        if(bullet.isSide)
            this.hp -= 2;
        else
            this.hp -= 1;

        this.infoController.setHpBar(this.hp);
        if(this.hp <= 0)
            return false;
        return true;
    }

    draw(context){
        this.alive();
        this.spriteController.draw(this, context);
    }
}
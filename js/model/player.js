class Player{
    constructor(){
        this.x = canvasW / 2;
        this.y = canvasH - canvasH / 5;
        this.r = 5;
        this.speed = 1.5;
        this.life = 3;
        this.isInvulnerable = false;
        this.invulnerableCounter = 0;
        this.shootInterval = 0;

        this.spriteController = new PlayerSpriteController("./assets/player.png", 144 / 3, 262 / 8 - 0.65, 0, 0, 10);
        this.isShift = false;
    }

    alive(){
        this.shootInterval--;
        this.spriteController.tick();
    }

    resetState(){
        this.spriteController.stateChange(0);
    }

    shoot(){
        if(this.shootInterval <= 0){
            for(var i=-1;i<=1;i++){
                if(i == -1 || i == 1)
                    bullets.push(new Bullet(this.x + (i * 15), this.y - 5, radius, 1.5 + (i * 15 / 200), true));
                bullets.push(new Bullet(this.x + (i * 15), this.y - 5, radius, 1.5, false));
            }
            this.shootInterval = 5;
        }
    }

    invulnerable(){
        this.isInvulnerable = true;
        this.invulnerableCounter = 100;
    }

    invulnerableCd(){
        this.invulnerableCounter--;
        if(this.invulnerableCounter == 0)
            this.isInvulnerable = false;
    }

    collisionDetect(ball){
        if(Math.pow(ball.x - this.x, 2) + Math.pow(ball.y - this.y, 2) <= Math.pow(ball.r + this.r, 2))
            return this.takeDamage();
        return true;
    }

    takeDamage(){
        if(!this.isInvulnerable){
            this.life--;
            lifeControl(this.life);
            this.invulnerable();
        }

        if(this.life == 0)
            return false;
        return true;
    }

    isOutX(val){
        if(
            this.x + this.r + val >= canvasW || this.x - this.r + val <= 0
        )
            return true;
        else
            return false;
    }

    isOutY(val){
        if(
            this.y + this.r + val >= canvasH || this.y - this.r + val <= 0
        )
            return true;
        else
            return false;
    }

    moveLeft(){
        if(!this.isOutX(-this.speed)){
            if(this.isShift)
                this.x -= (this.speed / 2);
            else
            this.x -= this.speed;
        }
        this.spriteController.stateChange(1);
    }

    moveRight(){
        if(!this.isOutX(this.speed)){
            if(this.isShift)
                this.x += (this.speed / 2);
            else
                this.x += this.speed;
        }
        this.spriteController.stateChange(2);
    }

    moveUp(){
        if(!this.isOutY(-this.speed)){
            if(this.isShift)
                this.y -= (this.speed / 2);
            else
                this.y -= this.speed;
        }
    }

    moveDown(){
        if(!this.isOutY(this.speed)){
            if(this.isShift)
                this.y += (this.speed / 2);
            else
                this.y += this.speed;
        }
    }

    draw(context){
        this.alive();
        this.spriteController.draw(this, context);
    }
}
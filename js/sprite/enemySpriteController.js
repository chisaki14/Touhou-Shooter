class EnemySpriteController{
    constructor(imageSrc, imageHeight, imageWidth, state, animationCount, tickCount){
        this.image = new Image();
        this.image.src = imageSrc;
        this.imageHeight = imageHeight;
        this.imageWidth = imageWidth;
        this.state = state;
        this.animationCount = animationCount;
        this.tickCount = tickCount;
    }

    tick(enemy){
        this.tickCount--;
        if(this.tickCount == 0){
            this.tickCount = 5;
            this.animationCount++;
            if(enemy.isTeleportIn && this.animationCount == 6){
                enemy.isTeleportIn = false;
                enemy.isTeleportOut = true;

                var rand = Math.floor(Math.random() * 3) + 1;
                enemy.x = canvasW / 4 * rand;
                this.state = 1;
                this.animationCount = 0;
            }
            else if(enemy.isTeleportOut && this.animationCount == 4){
                enemy.isTeleportOut = false;
                this.state = 0;
                this.animationCount = 0;
            }
        }
    }

    draw(enemy, context){
        context.drawImage(
            this.image, 
            this.state * this.imageWidth, 
            this.animationCount * this.imageHeight, 
            this.imageWidth, 
            this.imageHeight, 
            enemy.x - (this.imageWidth / 2), 
            enemy.y - (this.imageHeight / 2),
            this.imageWidth,
            this.imageHeight
        );
    }
}
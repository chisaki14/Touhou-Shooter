class PlayerSpriteController{
    constructor(imageSrc, imageHeight, imageWidth, state, animationCount, tickCount){
        this.image = new Image();
        this.image.src = imageSrc;
        this.imageHeight = imageHeight;
        this.imageWidth = imageWidth;
        this.state = state;
        this.animationCount = animationCount;
        this.tickCount = tickCount;
    }

    tick(){
        this.tickCount--;
        if(this.tickCount == 0){
            this.tickCount = 10;
            this.animationCount++;
            this.animationCount %= 8;
        }
    }

    stateChange(state){
        this.state = state;
    }

    draw(player, context){
        ctx.drawImage(
            this.image, 
            this.animationCount * this.imageWidth, 
            this.state * this.imageHeight, 
            this.imageWidth, 
            this.imageHeight, 
            player.x - (this.imageWidth / 2), 
            player.y - (this.imageHeight / 2),
            this.imageWidth,
            this.imageHeight
        );

        context.beginPath();
        context.arc(player.x + 1.5, player.y, player.r, 0, 2 * Math.PI);
        if(!player.isInvulnerable)
            context.fillStyle = "#079992";
        else
            context.fillStyle = "#fbc531";
        context.fill();
        context.closePath();
    }
}
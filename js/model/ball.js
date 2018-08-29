class Ball{
    constructor(x, y, r, speed, speedDecrease, angle, isExplode, explodeCd, explodeSpeed, explodeCount){
        this.x = x;
        this.y = y;
        this.r = r;

        this.speed = speed;
        this.speedDecrease = speedDecrease / 1000;
        this.angle = angle;
        this.isExplode = isExplode || false;
        this.explodeCd = explodeCd || 0;
        this.explodeSpeed = explodeSpeed || 0;
        this.explodeCount = explodeCount || 0;
    }

    alive(){
        if(this.isExplode){
            this.explodeCd--;

            if(this.speed > 0)
                this.speed -= this.speedDecrease;
            if(this.explodeCd <= 0){
                this.isExplode = false;
                this.explode();
                return false;
            }
        }
        return true;
    }

    explode(){
        var ballIndex = 0;
        for(var i=0;i<this.explodeCount;i++){
            balls.push(new Ball(this.x, this.y, radius, this.explodeSpeed, 0, ballIndex, false));
            ballIndex += (2 / this.explodeCount);
        }
    }

    isOut(){
        if(
            this.x - this.r >= canvasW || this.x + this.r <= 0 || 
            this.y - this.r >= canvasH || this.y + this.r <= 0
        )
            return true;
        else
            return false;
    }

    move(){
        this.x += Math.cos(Math.PI * this.angle) * this.r * this.speed;
        this.y += Math.sin(Math.PI * this.angle) * this.r * this.speed;
        this.d += 1;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        if(this.isExplode)
            context.fillStyle = "#f0932b";
        else
            context.fillStyle = "#eb4d4b";
        context.fill();
        context.closePath();
    }
}
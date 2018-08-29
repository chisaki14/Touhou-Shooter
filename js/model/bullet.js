class Bullet{
    constructor(x, y, r, angle, isSide){
        this.x = x;
        this.y = y;
        this.r = r;

        this.speed = 2;
        this.angle = angle;
        this.isSide = isSide;
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
        if(this.isSide)
            context.fillStyle = "#6c5ce7";
        else
            context.fillStyle = "#6a89cc";
        context.fill();
        context.closePath();
    }
}
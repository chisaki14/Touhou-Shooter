class Pattern{
	constructor(type, cd){
		this.type = type;
		this.cd = cd;
		this.maxCd = cd;
		this.count = 0;

		// Use prime number while increment or decrement index value to maximize pattern difficulty
		this.indexCW = 0;
		this.indexCCW = 0;
	}

	alive(){
		this.cd--;
		if(this.type == 1){
			this.count++;
			if (this.count % 5 == 0) {
                balls.push(new Ball(enemy.x, enemy.y, radius, 0.55, 0, this.indexCW, true, 100, 0.45, 10));
                this.indexCW += 0.37;
            }

            if(this.count % 50 == 0){
				for(var i=0;i<8;i++){
					balls.push(new Ball(enemy.x, enemy.y, radius, 0.65, 0, this.indexCW));
					this.indexCW += 0.25;
				}
				this.indexCW += 0.23;
			}
		}
		else if(this.type == 2){
			this.count++;
			if (this.count % 5 == 0) {
                balls.push(new Ball(enemy.x, enemy.y, radius, 0.45, 0, this.indexCW, true, 100, 0.5, 8));
                balls.push(new Ball(enemy.x, enemy.y, radius, 0.45, 0, this.indexCCW));
				this.indexCW += 0.37;
				this.indexCCW -= 0.37;
            } 
		}
		else if(this.type == 3){
			this.count++;
			if(this.count % 50 == 0){
				for(var i=0;i<10;i++){
					balls.push(new Ball(enemy.x, enemy.y, radius, 0.5, 0, this.indexCW, true, 150, 0.45, 10));
					this.indexCW += 0.2;
				}
				this.indexCW += 0.47;
			}
		}
		else if(this.type == 4){
			this.count++;
			if(this.count % 10 == 0){
                balls.push(new Ball(enemy.x, enemy.y, radius, 0.5, 0, this.indexCW, true, 100, 0.5, 8));
                this.indexCW += 0.15;
			}
		}
		else if(this.type == 5){
			this.count++;
			if(this.count % 30 == 0){
				for(var i=0;i<10;i++){
					balls.push(new Ball(enemy.x, enemy.y, radius, 1.5, 7.5, this.indexCW, true, 100, 0.45, 8));
					this.indexCW += 0.2;
				}
				this.indexCW += 0.37;
			}
		}
	}

	resetCd(){
		this.cd = this.maxCd;
		this.indexCW = 0;
		this.indexCCW = 0;
		this.count = 0;
	}
}
class EnemyInfoController{
    constructor(maxHp, name){
        this.maxHp = maxHp;
        this.bar = document.getElementById("enemy-hp");
        document.getElementById("enemy-name").innerText = name;
    }

    setHpBar(val){
        var hpPercent = val / this.maxHp * 100;
        this.bar.style.width = hpPercent + "%";
    }
}
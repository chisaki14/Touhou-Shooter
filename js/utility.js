function leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}

function scoreManager(){
    playerScore += 7;
    document.getElementById("score-counter").innerText = leftPad(playerScore, 9);
}

function lifeControl(life){
    document.getElementById("life-counter").innerHTML = "";
    for(var i=0;i<life;i++){
        img.push(new Image(25, 25));
        img[i].src = "./assets/life.png";
        document.getElementById("life-counter").appendChild(img[i]);
    }
}
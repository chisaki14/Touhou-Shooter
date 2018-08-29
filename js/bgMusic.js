function loadBgMusic(){
    bgMusic.volume = 0.5;
    bgMusic.loop = true;
    bgMusic.load();
}

function bgMusicPlay(){
    // Due to Google Chrome autoplay policy on April 2018, play() method will NOT work without user's interaction
    // For more information, please visit https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
    if(!isMusicTriggered){
        var promise = bgMusic.play();
        if (promise !== undefined) {
            promise.then(_ => {
                isMusicTriggered = true;
            }).catch(error => {
              
            });
        }
    }
}

function bgMusicMute(){
    isMusicMuted = !isMusicMuted;
    if(isMusicMuted){
        audioIcon.classList.remove("fa-volume-up");
        audioIcon.classList.add("fa-volume-off");
        audioText.innerText = "Background music is off";
    }
    else{
        audioIcon.classList.remove("fa-volume-off");
        audioIcon.classList.add("fa-volume-up");
        audioText.innerText = "Background music is on";
    }
    bgMusic.muted = isMusicMuted;
}
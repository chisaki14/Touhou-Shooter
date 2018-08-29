function onKeyDown(){
    kd.LEFT.down(() => {
        player.moveLeft();
    });
    kd.RIGHT.down(() => {
        player.moveRight();
    });
    kd.LEFT.up(() => {
        player.resetState();
    });
    kd.RIGHT.up(() => {
        player.resetState();
    });
    kd.UP.down(() => {
        player.moveUp();
    });
    kd.DOWN.down(() => {
        player.moveDown();
    });
    kd.SPACE.down(() => {
        player.shoot();
    });
    kd.SHIFT.down(() => {
        player.isShift = true;
    });
}

function onKeyUp(){
    kd.SHIFT.up(() => {
        player.isShift = false;
    });
}
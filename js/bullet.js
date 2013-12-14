GAME.setConsts({
});

GAME.Bullet = (function() {

    function newBullet() {
        return {
            x : -1,
            y : -1,
            xvel : 0,
            yvel : 0,

            angle : 0,

            path : []
        }
    }

    function step(bullet) {
        bullet.x += xvel;
        bullet.y += yvel;
    }


    return {
        newBullet : newBullet,
        step : step
    }
})();
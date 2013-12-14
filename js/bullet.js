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

    function detectCollisions(bullet) {
        for (ent : GAME.entities) {
            if (GAME.Entity.dist(bullet, ent) < 1) {
                if (ent.isPlayer) {
                    GAME.end();
                } else { // bullet hit an enemy
                    GAME.yay();
                    GAME.score++;
                }
            }
        }

        // look at 9 surrounding tiles
        for (wall : walls) {
            if (collision) {
                theta = calculateThetaOut();
                // undoStep(); // TODO: is this necessary?
                bullet.path.push([bullet.x, bullet.y]);
            }
        }
    }


    return {
        newBullet : newBullet,
        step : step
    }
})();
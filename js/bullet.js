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

        // check collision with surrounding tiles
        rx = Math.round(bullet.x)
        ry = Math.round(bullet.y)
        for (var i = rx - 1.5; i < 3; i++) {
            for (var j = ry - 1.5; j < 3; j++) {
                tilecoors = {x: i, y: j}
                if (GAME.current_level.tilemap[i][j] == WALL_TILE && dist(bullet, tilecoors) < 1) {
                    var hitsUp = hitsDown = hitsRight = hitsLeft = true;
                    if (bullet.x < i) {
                        hitsLeft = false;
                    }
                    if (bullet.x > i) {
                        hitsRight = false;
                    }
                    if (bullet.y < j) {
                        hitsDown = false;
                    }
                    if (bullet.y > j) {
                        hitsUp = false;
                    }

                    if (hitsUp || hitsDown) {
                        bullet.yvel *= -1;
                    }
                    if (hitsLeft || hitsRight) {
                        bullet.xvel *= -1;
                    }

                    // change to new angle, reverse some velocity
                    // undoStep(); // TODO: is this necessary?
                    bullet.path.push([bullet.x, bullet.y]);
                }
            }
        }
    }


    return {
        newBullet : newBullet,
        step : step
    }
})();
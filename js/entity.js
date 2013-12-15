GAME.setConsts({
    E_MAXVEL : 10,
	S_PLAYER : [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]],
    S_BULLET : [[0, .5], [-.3, 0.15], [-.3, -.3], [.3, -.3], [.3, 0.15]],
    E_TYPE_ENEMY : 0,
    E_TYPE_PLAYER : 1,
    E_TYPE_BULLET : 2,
    REPULSION_CONST : 3,
});

GAME.Entity = (function() {

    function newEntity(x, y, shape, type) {
        return {
            x : GAME.defaultTo(x, 5),
            y : GAME.defaultTo(y, 5),
            xvel : 0,
            yvel : 0,

            angle : 0,
            accel : 1,
            maxSpeed : 3,

            entityType : type,

            path : [],

            shape : cloneShape(shape)
        }
    }

    function newEnemy(x, y, shape) {
        return newEntity(x, y, shape, GAME.E_TYPE_ENEMY);
    }

    function newPlayer(x, y, shape) {
        return newEntity(x, y, shape, GAME.E_TYPE_PLAYER);
    }

    function newBullet(x, y, shape) {
        return newEntity(x, y, shape, GAME.E_TYPE_BULLET);
    }

    function cloneShape(shape) {
		var newShape = [];
		for (var i = 0; i < shape.length; i++) {
			newShape.push([shape[i][0], shape[i][1]]);
		}

		return newShape;
    }

    function step(ent) {
        ent.x += ent.xvel;
        ent.y += ent.yvel;

        return ent;
    }

    function move(ent, dx, dy) {
        var acl = Math.sqrt(dx * dx + dy * dy);

        ent.xvel *= 0.8;
        ent.yvel *= 0.8;

		if (acl != 0) {
        	dx /= acl;
        	dy /= acl;
			dx *= ent.accel;
			dy *= ent.accel;
		}

		ent.xvel += dx;
		ent.yvel += dy;

        var spd = Math.sqrt(ent.xvel*ent.xvel + ent.yvel*ent.yvel);
        if (spd > ent.maxSpeed) {
			ent.xvel /= spd;
			ent.yvel /= spd;
			ent.xvel *= ent.maxSpeed;
			ent.yvel *= ent.maxSpeed;
        }

		ent.x += ent.xvel;
		ent.y += ent.yvel;
        return ent;
    }

    function dist(ent1, ent2) {
        dx = ent1.x - ent2.x
        dy = ent1.y - ent2.y
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    }

    function shoot(ent) {
        bullet = GAME.Entity.newBullet(ent.x, ent.y, GAME.S_BULLET);
        bullet.angle = ent.angle - 90;

        bullet.xvel = GAME.E_MAXVEL * Math.cos(ent.angle);
        bullet.yvel = GAME.E_MAXVEL * Math.sin(ent.angle);

        GAME.bullets.push(bullet);
        return bullet;
    }

    function detectCollisions(ent) {
    	var entities = GAME.entities,
    	    CONST = GAME.REPULSION_CONST;

		for (var i=0; i < entities.length; i++) {
			if (entities[i] == ent)
				continue;

			var d = dist(entities[i], ent),
			    dx = entities[i].x - ent.x,
			    dy = entities[i].y - ent.y,
			    angleToEnt = Math.atan2(dy, dx);

			if (d < 5) {
				if (ent.entityType == GAME.E_TYPE_BULLET) {
					if (entities[i] == GAME.player) {
						GAME.end();
					} else {
						entities.splice(i, 1);
					}
				} else {
					ent.xvel -= Math.cos(angleToEnt) * CONST;
					ent.yvel -= Math.sin(angleToEnt) * CONST;
					entities[i].xvel += Math.cos(angleToEnt) * CONST;
					entities[i].yvel += Math.sin(angleToEnt) * CONST;
				}
			}
		}
    }

    return {
        detectCollisions : detectCollisions,
        step : step,
        move : move,
        dist : dist,
        shoot : shoot,
        newEntity : newEntity,
        newEnemy : newEnemy,
        newPlayer : newPlayer,
        newBullet : newBullet
    }
})();

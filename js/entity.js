GAME.setConsts({
    E_MAXVEL : 0.1,
    B_MAXVEL : 0.1,
	S_PLAYER : [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]],
    S_BULLET : [[0, .5], [-.3, 0.15], [-.3, -.3], [.3, -.3], [.3, 0.15]],
    E_TYPE_ENEMY : 0,
    E_TYPE_PLAYER : 1,
    E_TYPE_BULLET : 2,
    REPULSION_CONST : 3 / 30,
    WALL_REPULSION_CONST : 3 / 30,
});

GAME.Entity = (function() {

    function newEntity(x, y, shape, type) {
        return {
            x : GAME.defaultTo(x, 5),
            y : GAME.defaultTo(y, 5),
            xvel : 0,
            yvel : 0,

            angle : 0,
            accel : 1/30,
            maxSpeed : GAME.E_MAXVEL,

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
        var bullet = newEntity(x, y, shape, GAME.E_TYPE_BULLET);
        bullet.path.push([bullet.x, bullet.y]);
        return bullet;
    }

    function cloneShape(shape) {
		var newShape = [];
		for (var i = 0; i < shape.length; i++) {
			newShape.push([shape[i][0], shape[i][1]]);
		}

		return newShape;
    }

    function step(ent) {
    	var TIME_FACTOR = 0.08;
        ent.x += ent.xvel * GAME.frames[GAME.frames.length-1]*TIME_FACTOR;
        ent.y += ent.yvel * GAME.frames[GAME.frames.length-1]*TIME_FACTOR;

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
        var dx = ent1.x - ent2.x;
        var dy = ent1.y - ent2.y;
        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    }

    function shoot(ent) {
        bullet = GAME.Entity.newBullet(ent.x, ent.y, GAME.S_BULLET);
        bullet.angle = ent.angle;

        bullet.xvel = GAME.B_MAXVEL * Math.cos(ent.angle);
        bullet.yvel = GAME.B_MAXVEL * Math.sin(ent.angle);

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
					entities.splice(i, 1);
					GAME.kills++;
				} else {
					ent.xvel -= Math.cos(angleToEnt) * CONST;
					ent.yvel -= Math.sin(angleToEnt) * CONST;
					entities[i].xvel += Math.cos(angleToEnt) * CONST;
					entities[i].yvel += Math.sin(angleToEnt) * CONST;
				}
			}
		}

		var tilex = Math.floor(ent.x / GAME.TILE_SCALE),
		    tiley = Math.floor(ent.y / GAME.TILE_SCALE),
		    wallCollided = false;
		for (var i = -1; i <= 1; i++) {
			for (var j = -1; j <= 1; j++) {
				wallCollided |= detectWallCollision(ent, tilex+j, tiley+i);
			}
		}

    if (wallCollided) {
      ent.path.push([ent.x, ent.y]);
    }

		return wallCollided;
    }

    function detectWallCollision(ent, tilex, tiley) {
    	var CONST = GAME.WALL_REPULSION_CONST,
		    width = GAME.current_level.size.width,
		    height = GAME.current_level.size.height;

		if (tilex < 0 || width <= tilex || tiley < 0 || height < tiley)
			return;
    	if (GAME.current_level.tilemap[tilex][tiley] == GAME.FLOOR_TILE)
    		return;

    	var tx = (tilex + 0.5) * GAME.TILE_SCALE,
    	    ty = (tiley + 0.5) * GAME.TILE_SCALE,
		    d = Math.sqrt(Math.pow(tx-ent.x, 2) + Math.pow(ty-ent.y, 2)),
			dx = tx - ent.x,
			dy = ty - ent.y,
			angleToEnt = Math.atan2(dy, dx);
		
		var collision = true;
		if (d < 5) {
			collision = false;
			if (ent.entityType == GAME.E_TYPE_BULLET) {
				if (tilex != Math.floor(ent.x / GAME.TILE_SCALE))
					ent.xvel *= -1;
				if (tiley != Math.floor(ent.y / GAME.TILE_SCALE))
					ent.yvel *= -1;
			} else {
				ent.xvel -= Math.cos(angleToEnt) * CONST;
				ent.yvel -= Math.sin(angleToEnt) * CONST;
			}
		}

		return collision;
    }

    function speedOf(entity) {
		return Math.sqrt(Math.pow(entity.xvel, 2) +
		                 Math.pow(entity.yvel, 2));
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
        newBullet : newBullet,
        speedOf : speedOf,
    }
})();

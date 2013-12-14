GAME.setConsts({
  E_MAXVEL : 10,
	S_PLAYER : [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]]
});

GAME.Entity = (function() {

    function newEntity(x, y, shape) {
        return {
            x : GAME.defaultTo(x, 0),
            y : GAME.defaultTo(y, 0),
            xvel : 0,
            yvel : 0,

            angle : 0,
            accel : 0.1,

            isPlayer : false,

            shape : cloneShape(shape)
        }
    }

    function cloneShape(shape) {
		var newShape = [];
		for (var i = 0; i < shape.length; i++) {
			newShape.push([shape[i][0], shape[i][1]]);
		}

		return newShape;
    }

    function move(ent, dx, dy) {
        var spd = Math.sqrt(dx * dx + dy * dy);

        dx /= spd;
        dy /= spd;

		dx *= ent.accel;
		dy *= ent.accel;

		ent.xvel += dx;
		ent.yvel += dy;

		ent.x += ent.xvel;
		ent.y += ent.yvel;

        return ent;
    }

    function dist(ent1, ent2) {
        dx = ent1.x - ent2.x
        dy = ent1.y - ent2.y
        return sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    }

    function shoot(ent) {
        bullet = GAME.Bullet.newBullet();
        bullet.x = ent.x;
        bullet.y = ent.y;
        bullet.angle = ent.angle;

        return bullet;
    }


    return {
        move : move,
        dist : dist,
        shoot : shoot,
        newEntity : newEntity
    }
})();

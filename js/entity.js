GAME.setConsts({
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
        ent.xvel += dx;
        ent.yvel += dy;
        return ent;
    }

    function dist(ent1, ent2) {
        dx = ent1.x - ent2.x
        dy = ent1.y - ent2.y
        return sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    }

    function shoot(ent) {
        // spawn new bullet heading at angle of entity
    }


    return {
        move : move,
        dist : dist,
        shoot : shoot,
        newEntity : newEntity
    }
})();

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

    function shoot(ent) {
        // spawn new bullet heading at angle of entity
    }


    return {
        move : move,
        shoot : shoot,
        newEntity : newEntity
    }
})();

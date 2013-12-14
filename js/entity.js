GAME.setConsts({
});

GAME.Entity = (function() {

    function newEntity(x, y) {
        return {
            x : GAME.defaultTo(x, 0),
            y : GAME.defaultTo(y, 0),
            xvel : 0,
            yvel : 0,

            angle : 0,

            shape : []
        }
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

GAME.setConsts({
});

GAME.Entity = (function() {

    function newEntity() {
        return {
            x : -1,
            y : -1,
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
        shoot : shoot
    }
})();
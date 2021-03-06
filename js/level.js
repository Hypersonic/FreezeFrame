GAME.setConsts({
    FLOOR_TILE      : 0,
    WALL_TILE       : 1
});

GAME.Level = (function() {

    var wow = false;

    function newLevel() {
        return {
            tilemap : [],

            size    : {
                width: 100,
                height : 100
            },

            spawn : {
                x: 1,
                y: 1,
                angle: 0
            },

            hallways : []
        }
    }

    function generateMapTiles() {
        var level = newLevel();

        GAME.Generator.generate(level);

        return level;
    }

    return {
        generateMapTiles : generateMapTiles
    }
})();

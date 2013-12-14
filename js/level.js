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
                width: 10,
                height : 10
            },

            spawn : {
                x: 1,
                y: 1,
                angle: 0
            }
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

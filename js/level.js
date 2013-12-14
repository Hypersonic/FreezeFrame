GAME.setConsts({
    FLOOR_TILE      : 0,
    WALL_TILE       : 1
});

GAME.Level = (function() {

    var wow = false;

    function newLevel() {
        return {
            tilemap : [],

            spawn : {
                x: 1,
                y: 1,
                angle: 0
            }
        }
    }

    function generateMapTiles() {
        var level = newLevel();

        Game.Generator.generate(level);

        return level;
    }

    return {
        checkLine : checkLine
    }
})();

Game.setConsts({
    WALL_TILE       : 1
});

Game.Level = (function() {

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

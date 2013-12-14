Game.setConsts({
    SHIT            : 1
});

Game.Generator = (function() {

    var wow = false;

    function generate(level) {
        width = level.size[width];
        height = level.size[height];

        // generate tilemap full of floor
        for (var i = 0, i < width; i++) {
            for (var j = 0, j < height; j++) {
                tilemap[i][j] = FLOOR_TILE;
            }
        }

        // shitty generation
        // every 10th tile is a wall
        for (var i = 0, i < width; i++) {
            for (var j = 0, j < height; j++) {
                if (Math.random > 0.9) {
                    tilemap[i][j] = WALL_TILE;
                }
            }
        }

        return level;
    }

    return {
        generate : generate
    }
})();
GAME.setConsts({
    SHIT            : 1
});

GAME.Generator = (function() {

    var wow = false;

    function generate(level) {
        width = level.size.width;
        height = level.size.height;

        // generate tilemap full of floor
        for (var i = 0; i < width; i++) {
            level.tilemap.push([]);
            for (var j = 0; j < height; j++) {
                level.tilemap[i].push([]);
                level.tilemap[i][j] = GAME.FLOOR_TILE;
            }
        }

        // shitty generation
        // every 10th tile is a wall
        for (var i = 0; i < width; i++) {
            for (var j = 0; j < height; j++) {
                if (Math.random() > 0.9) {
                    level.tilemap[i][j] = GAME.WALL_TILE;
                }
            }
        }

        return level;
    }

    return {
        generate : generate
    }
})();

GAME.setConsts({
});

GAME.Generator = (function() {

	function generate(level) {
		var width = level.size.width,
		    height = level.size.height,
		    hallways = [];

		for (var i = 0; i < height; i++) {
			var row = [];
			for (var j = 0; j < width; j++) {
				row.push(GAME.WALL_TILE);
			}

			level.tilemap.push(row);
		}

		for (var i = 0; i < 5; i++) {
			generateHallway(level);
		}

		for (var i = 0; i < height; i++) {
			level.tilemap[0][i] = GAME.WALL_TILE;
			level.tilemap[width-1][i] = GAME.WALL_TILE;
		}

		for (var i = 0; i < width; i++) {
			level.tilemap[i][0] = GAME.WALL_TILE;
			level.tilemap[i][height-1] = GAME.WALL_TILE;
		}
	}

	function generateHallway(level) {
		var width = level.size.width,
		    height = level.size.height,
		    halls = 5;

		var found = false;
		while (!found) {
		    var y = Math.floor(Math.random() * height);
		    var flailed = false;

		    for (var i = 0; i < level.hallways.length; i++) {
				if (Math.abs(level.hallways[i] - y) < 6) {
					flailed = true;
					break;
				}
		    }

		    found = !flailed;
		}
		level.hallways.push(y);

		for (var i = 0; i < width; i++) {
			for (var j = -1; j <= 1; j++) {
				if (j + y < 0 || j + y > width)
					continue;
				if (j + y < 0 || j + y > width)
					continue;

				level.tilemap[i][j + y] = GAME.FLOOR_TILE;
				level.tilemap[j + y][i] = GAME.FLOOR_TILE;
			}
		}
	}

	return {
		generate : generate
	}
})();

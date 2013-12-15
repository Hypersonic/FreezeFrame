GAME.setConsts({
});

GAME.Generator = (function() {

	function generate(level) {
		var width = level.size.width,
		    height = level.size.height,
		    prvHall;

		for (var i = 0; i < height; i++) {
			var row = [];
			for (var j = 0; j < width; j++) {
				row.push(GAME.WALL_TILE);
			}

			level.tilemap.push(row);
		}

		var x1, x2, y1, y2;
		for (var i = 0; i < 40; i++) {
			var x1 = Math.floor(Math.random() * width),
			    y1 = Math.floor(Math.random() * height),
				x2 = Math.floor(Math.random() * (width - x1)),
			    y2 = Math.floor(Math.random() * (height - y1)),
			    x3 = Math.floor(Math.random() * width),
			    y3 = Math.floor(Math.random() * height);

			generateHorizHallway(level, x1, x2, y3);
			generateVertHallway(level, y1, y2, x3);
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

	function generateVertHallway(level, y1, y2, x) {
		var width = level.size.width,
		    height = level.size.height,
		    halls = 5;

		for (var i = y1; i <= y2; i++) {
			for (var j = -1; j <= 1; j++) {
				if (j + x < 0 || j + x > width)
					continue;

				level.tilemap[j + x][i] = GAME.FLOOR_TILE;
			}
		}
	}

	function generateHorizHallway(level, x1, x2, y) {
		var width = level.size.width,
		    height = level.size.height,
		    halls = 5;

		for (var i = x1; i <= x2; i++) {
			for (var j = -1; j <= 1; j++) {
				if (j + y < 0 || j + y > height)
					continue;

				level.tilemap[i][j + y] = GAME.FLOOR_TILE;
			}
		}
	}

	return {
		generate : generate
	}
})();

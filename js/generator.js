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
				row.push(GAME.FLOOR_TILE);
			}

			level.tilemap.push(row);
		}

		for (var i = 0; i < 10; i++) {
			generateRoom(level);
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

	function generateRoom(level) {
		var width = level.size.width,
		    height = level.size.height;

		var found = false;
		while (!found) {
			do
				var x1 = Math.floor(Math.random() * width);
			while (width - x1 < 10);
			do
		    	var y1 = Math.floor(Math.random() * height);
			while (height - y1 < 10);
			do
		    	var x2 = Math.floor(x1 + Math.random() * (width - x1));
		    while (x2 - x1 < 5);
			do
		    	var y2 = Math.floor(y1 + Math.random() * (height - y1));
		    while (x2 - x1 < 5);

			found = true;
			for (var i = -1; i <= y2 - y1+1; i++) {
				for (var j = -1; j <= x2 - x1+1; j++) {
					if (!(0 <= y1 + i && y1 + i < height &&
						0 <= x1 + j  && x1 + j < width))
						continue;
					if (level.tilemap[y1 + i][x1 + j] == GAME.WALL_TILE) {
						found = false;
						break;
					}
				}
				if (!found)
					break;
			}
		}

		for (var i = x1; i <= x2; i++) {
			level.tilemap[y1][i] = GAME.WALL_TILE;
			level.tilemap[y2][i] = GAME.WALL_TILE;
		}

		for (var i = y1; i <= y2; i++) {
			level.tilemap[i][x1] = GAME.WALL_TILE;
			level.tilemap[i][x2] = GAME.WALL_TILE;
		}

		console.log(x1 + " " + y1 + " " + x2 + " " + + " " + y2);
	}

	function generateVertHallway(level, y1, y2, x) {
		var width = level.size.width,
		    height = level.size.height;

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

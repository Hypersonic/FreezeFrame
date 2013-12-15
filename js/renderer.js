GAME.setConsts({
	canvas : document.createElement("canvas"),
	CANVAS_WIDTH : 500,
	CANVAS_HEIGHT : 500,
	TILE_SCALE : 5,
	C_PLAYER : "rgb(0,200,0)",
	C_PL_BULLET : "rgb(0,0,255)",
	C_ENEMY : "rgb(255,0,0)",
	C_EN_BULLET : "rgb(100,100,100)",
	C_FLOOR	: "rgb(255,255,255)",
	C_WALL : "rgb(0,0,0)",
});

GAME.setConsts({
	ctx : GAME.canvas.getContext("2d"),
	VIEW_WIDTH : GAME.CANVAS_WIDTH / GAME.TILE_SCALE - 2,
	VIEW_HEIGHT : GAME.CANVAS_HEIGHT / GAME.TILE_SCALE - 2,
});

GAME.Renderer = (function() {
	var canvas = GAME.canvas,
		height = GAME.CANVAS_HEIGHT,
		width	= GAME.CANVAS_WIDTH,
		scale = GAME.TILE_SCALE,
		ctx		= GAME.ctx,
		WALL_TILE	 = GAME.WALL_TILE,
		C_FLOOR = GAME.C_FLOOR,
		C_WALL = GAME.C_WALL,
		C_PLAYER = GAME.C_PLAYER,
		C_PL_BULLET = GAME.C_PL_BULLET,
		C_ENEMY = GAME.C_ENEMY,
		C_EN_BULLET = GAME.C_EN_BULLET,
		VIEW_WIDTH = GAME.VIEW_WIDTH,
		VIEW_HEIGHT = GAME.VIEW_HEIGHT,
    vgnfade = 0,
    vgnmax = .8;


	canvas.height = height;
	canvas.width = width;

	function draw() {
		drawFloors();
		drawWalls();
		drawBullets();
		drawEntities();
    if (GAME.frozen) {
      drawVingette();
    }
	}

	function drawTile(x, y) {
		//TODO: Check if tile is within window bounds
		ctx.fillRect(x*scale, y*scale, scale, scale);
	}

	function drawFloors() {
		ctx.fillStyle = C_FLOOR;
		ctx.fillRect(0,0,width,height); // Fill everything as floors to start
	}

	function drawWalls() {
		ctx.fillStyle = C_WALL;
		var level = GAME.current_level;
		for (var i = 0, len = level.tilemap.length; i < len; i++){
			for (var j = 0, hei = level.tilemap[i].length; j < hei; j++) {
				if (level.tilemap[i][j] == WALL_TILE) {
					drawTile(i,j);
				}
			} 
		}
	}

	function drawBullets() {
		ctx.fillStyle = C_PL_BULLET;
		for (var i = 0, len = GAME.bullets.length; i < len; i++) {
			drawEntity(GAME.bullets[i]);
		}
	}

	function drawEntities() {
		ctx.fillStyle = C_PLAYER;
		drawEntity(GAME.player);

		ctx.fillStyle = C_ENEMY;
		for (var i = 0; i < GAME.entities.length; i++) {
			drawEntity(GAME.entities[i]);
		}
	}

	function drawEntity(e) {
		var points = GAME.Math.rotatePoints(e.shape, e.angle);

		ctx.beginPath();
		ctx.moveTo(e.x + points[0][0] * scale,
		           e.y + points[0][1] * scale);
		for (var i = 1; i < points.length; i++) {
			ctx.lineTo(e.x + points[i][0] * scale,
			           e.y + points[i][1] * scale);
		}
		ctx.closePath();
		ctx.fill();
	}

  function drawVingette() {
    var start = 0;
    vgnfade += (vgnmax - vgnfade) / 10;
    var cstart = "rgba(40,30,30,255)";
    var cend = "rgba(100,0,0,0)";
    var end = Math.min(vgnfade, vgnmax);
    var vingette = ctx.createLinearGradient(0,0,GAME.player.x, GAME.player.y);
    vingette.addColorStop(start, cstart);
    vingette.addColorStop(end, cend);
    ctx.fillStyle = vingette;
    ctx.fillRect(0,0,width,height);

    vingette = ctx.createLinearGradient(GAME.current_level.size.width*scale,GAME.current_level.size.height*scale,GAME.player.x,GAME.player.y);
    vingette.addColorStop(start, cstart);
    vingette.addColorStop(end, cend);
    ctx.fillStyle = vingette;
    ctx.fillRect(0,0,width,height);

    vingette = ctx.createLinearGradient(0,GAME.current_level.size.width*scale,GAME.player.x, GAME.player.y);
    vingette.addColorStop(start, cstart);
    vingette.addColorStop(end, cend);
    ctx.fillStyle = vingette;
    ctx.fillRect(0,0,width,height);

    vingette = ctx.createLinearGradient(GAME.current_level.size.width*scale,0,GAME.player.x, GAME.player.y);
    vingette.addColorStop(start, cstart);
    vingette.addColorStop(end, cend);
    ctx.fillStyle = vingette;
    ctx.fillRect(0,0,width,height);

  }
	return {
		draw : draw,
    drawVingette : drawVingette,
	}
})();

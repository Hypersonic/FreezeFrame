GAME.setConsts({
  canvas : document.createElement("canvas"),
  CANVAS_WIDTH : 800,
  CANVAS_HEIGHT : 600,
  TILE_SCALE : 5,
  C_PLAYER : "rgb(0,255,0)",
  C_PL_BULLET : "rgb(0,0,255)",
  C_ENEMY : "rgb(255,0,0)",
  C_EN_BULLET : "rgb(100,100,100)",
  C_FLOOR  : "rgb(255,255,255)",
  C_WALL : "rgb(0,0,0)",
});

GAME.setConsts({
  ctx : GAME.canvas.getContext("2d"),
});

GAME.Renderer = (function() {
  var canvas = GAME.canvas,
      height = GAME.CANVAS_HEIGHT,
      width  = GAME.CANVAS_WIDTH,
      scale = GAME.TILE_SCALE,
      ctx    = GAME.ctx,
      WALL_TILE   = GAME.WALL_TILE,
      C_FLOOR = GAME.C_FLOOR,
      C_WALL = GAME.C_WALL,
      C_PLAYER = GAME.C_PLAYER;

  canvas.height = height;
  canvas.width = width;

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

  function draw() {
    drawFloors();
    drawWalls();
  }

  return {
    draw : draw,
  }
})();

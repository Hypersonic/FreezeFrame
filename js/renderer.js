GAME.setConsts({
  canvas : document.createElement("canvas"),
  CANVAS_WIDTH : 800,
  CANVAS_HEIGHT : 600,
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
      ctx    = GAME.ctx,
      C_FLOOR = GAME.C_FLOOR,
      C_WALL = GAME.C_WALL,
      C_PLAYER = GAME.C_PLAYER;

  canvas.height = height;
  canvas.width = width;

  function drawFloors() {
    ctx.fillStyle = C_FLOOR;
    ctx.fillRect(0,0,width,height); // Fill everything as floors to start
  }

  function draw() {
    drawFloors();
  }

  return {
    draw : draw,
  }
})();

GAME.setConsts({
    SHIT            : 1
});

GAME.Generator = (function() {

    var wow = false;

    function generate(level) {
        width = level.size.width;
        height = level.size.height;

        // generate tilemap full of wall
        for (var i = 0; i < width; i++) {
            if (level.tilemap.length == i)
              level.tilemap.push([]);
            for (var j = 0; j < height; j++) {
              if (level.tilemap[i].length == j)
                level.tilemap[i].push([]);
              level.tilemap[i][j] = GAME.WALL_TILE;
            }
        }

       function randomWalk(startx, starty, goalx, goaly) {
          var cx = startx;
          var cy = starty;
          while (cx !== goalx || cy !== goaly) {
            var nx = (cx + Math.round((Math.random() - .5)*2));
            var ny = (cy + Math.round((Math.random() - .5)*2));
            if (nx >= 0 && nx < width) cx = nx;
            if (ny >= 0 && ny < height)cy = ny;
            for (var i = -1; i <= 1; i++) {
              for (var j = -1; j <= 1; j++) {
                if (level.tilemap[cx+i] != undefined) {
                  if (level.tilemap[cx+i][cy+j] != undefined) {
                    level.tilemap[cx+i][cy+j] = GAME.FLOOR_TILE;
                  }
                }
              }
            }
            //level.tilemap[cx][cy] = GAME.FLOOR_TILE;
          }
       }
       // Do a few randomwalks to fill out the map
       //randomWalk(width/2, height/2, 0, 0);
       //randomWalk(width/2, height/2, width-1, height-1);
       randomWalk(0,0, width/2, height/2);

        // put a wall around the edges
        for (var i = 0; i < width; i++) {
          level.tilemap[i][0] = GAME.WALL_TILE;
          level.tilemap[i][height-1] = GAME.WALL_TILE;
        }
        for (var j = 0; j < height; j++) {
          level.tilemap[0][j] = GAME.WALL_TILE;
          level.tilemap[width-1][j] = GAME.WALL_TILE;
        }

        function percentFloor(map) {
          var walls = 0;
          var floors = 0;
          for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[i].length; j++) {
              if (map[i][j] == GAME.WALL_TILE) walls++;
              else floors++;
            }
          }
          return floors/(walls+floors);
        }

        var percent = percentFloor(level.tilemap) * 100;
        if (percent > 60 || percent < 30)
          return generate(level);
        else
          return level;
    }

    return {
        generate : generate
    }
})();

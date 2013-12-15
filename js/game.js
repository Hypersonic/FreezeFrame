var GAME = {

    framelength         :  Math.floor(1000/30), //30 fps
    fpsSampleSize       :  5

}

// With thanks to Wolfenstein3D-browser
GAME.setConsts = function(C) {
    for (var a in C) {
        if (C.hasOwnProperty(a) && !(a in GAME)) {
            GAME[a] = C[a];
        }
    }
}

//If v is undefined, return d, else return v
GAME.defaultTo = function(v, d) {
    return typeof v != "undefined" ? v : d;
}


GAME.setup = function() {
	// Add the drawing canvas to the page
    document.getElementById("gamedrawarea").appendChild(GAME.canvas);

    GAME.current_level = GAME.Level.generateMapTiles();
    GAME.bullets = [];
    GAME.entities = [];
    GAME.frames = []; // list of the number of ms it took to calculate the most recent bunch of frames
	for (var i = 0; i < 30; i++) {
		var x = Math.random() * GAME.current_level.size.width * GAME.TILE_SCALE;
		var y = Math.random() * GAME.current_level.size.height * GAME.TILE_SCALE;
		GAME.entities.push(GAME.Entity.newEntity(x, y, GAME.S_PLAYER));
	}

	GAME.player = GAME.Entity.newEntity(10, 10, GAME.S_PLAYER);
}

GAME.main = function() {

    // Reset timer for fps next frame
    var lastRender = Date.now();

    for (var i = 0; i < GAME.entities.length; i++)
    	GAME.AI.followAI(GAME.entities[i]);

    // Handle inputs
    var ddx = 0;
    var ddy = 0;
    if (GAME.I_DOWN) {
    	ddy++;
    }
    if (GAME.I_UP) {
    	ddy--;
    }
    if (GAME.I_LEFT) {
    	ddx--;
    }
    if (GAME.I_RIGHT) {
    	ddx++;
    }
    GAME.Entity.move(GAME.player, ddx, ddy);
    if (GAME.I_CLICK) {
      GAME.Entity.shoot(GAME.player);
    }

    // All bullets must step
    for (var i = 0; i < GAME.bullets.length; i++) {
        GAME.Entity.step(GAME.bullets[i]);
    }

    // Detect all collisions
    GAME.Entity.detectCollisions(GAME.player);
    for (var i = 0; i < GAME.entities.length; i++) {
        GAME.Entity.detectCollisions(GAME.entities[i]);
    }
    for (var i = 0; i < GAME.bullets.length; i++) {
        GAME.Entity.detectCollisions(GAME.bullets[i]);
    }

    var dx = GAME.MOUSE_X - GAME.player.x;
    var dy = GAME.MOUSE_Y - GAME.player.y;
    GAME.player.angle = Math.atan2(dy, dx);

    // Draw
    GAME.Renderer.draw();

    // Calculate fps
    var delta = Date.now() - lastRender;
    if (GAME.frames.length == GAME.fpsSampleSize)
    	GAME.frames = GAME.frames.slice(1,GAME.frames.length);
    GAME.frames.push(delta);

    function avgFPS(frames) {
        var sum = 0;
        for (var i = 0; i < frames.length; i++) {
            sum += frames[i];
        }
        return sum / frames.length;
    }

	var fps = Math.floor(1000/avgFPS(GAME.frames));
    document.getElementById('fps').innerHTML = fps + " FPS";

    // Schedule ourselves for another run, subtracted by the time for this
    // frame so we can catch up and keep game time consistient
    setTimeout(GAME.main, GAME.framelength - delta);
}

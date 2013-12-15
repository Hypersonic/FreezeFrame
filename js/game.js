var GAME = {
    framelength         : Math.floor(1000/30), //30 fps
    fpsSampleSize       : 5,
    enemyStyle          : 0,
    kills               : 0,
    incresed            : false,
    decresed            : false,
    hasShot             : false,
    over                : false,
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
    GAME.frozen = false;
	for (var i = 0; i < 30; i++) {
		var x = Math.random() * GAME.current_level.size.width * GAME.TILE_SCALE;
		var y = Math.random() * GAME.current_level.size.height * GAME.TILE_SCALE;
		GAME.entities.push(GAME.Entity.newEntity(x, y, GAME.S_PLAYER));
	}

	GAME.player = GAME.Entity.newEntity(10, 10, GAME.S_PLAYER);

	GAME.Renderer.draw();
}

GAME.debug = function() {
	if (!GAME.I_SWITCH)
		GAME.switched = false;

    if (GAME.I_SWITCH && !GAME.switched) {
    	GAME.switched = true;
    	GAME.enemyStyle = (GAME.enemyStyle+1) % 2;
    	console.log(GAME.enemyStyle);
    }

	if (!GAME.I_INCRES)
		GAME.incresed = false;
	if (!GAME.I_DECRES)
		GAME.decresed = false;
	
    if (GAME.I_INCRES && !GAME.incresed) {
    	GAME.incresed = true;
    	GAME.REPULSION_CONST += 1 / 30;
    }
    if (GAME.I_DECRES && !GAME.decresed) {
    	GAME.decresed = true;
    	GAME.REPULSION_CONST -= 1 / 30;
	}
}

GAME.main = function() {
	GAME.debug();

    if (GAME.I_SPACE) {
        GAME.frozen = true;
        GAME.framelength /= 2;
    }

    // Reset timer for fps next frame
    var lastRender = Date.now();

    if (!GAME.frozen) {
    	for (var j = 0; j < 30; j++) {
        	switch(GAME.enemyStyle) {
            	case GAME.AI_FOLLOW:
                	for (var i = 0; i < GAME.entities.length; i++)
                    	GAME.AI.followAI(GAME.entities[i]);
                	break;
            	case GAME.AI_SCATTER:
                	for (var i = 0; i < GAME.entities.length; i++)
                    	GAME.AI.scatterAI(GAME.entities[i]);
                	break;
            	case GAME.AI_PREDICT:
                	for (var i = 0; i < GAME.entities.length; i++)
                    	GAME.AI.predictAI(GAME.entities[i]);
                	break;
        	}

    		// Detect all collisions
    		for (var i = 0; i < GAME.entities.length; i++) {
        		GAME.Entity.detectCollisions(GAME.entities[i]);
    		}
        }

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
    	for (var j = 0; j < 30; j++) {
    		GAME.Entity.move(GAME.player, ddx, ddy);
    		GAME.Entity.detectCollisions(GAME.player);
    	}
    }

    if (GAME.I_CLICK && GAME.frozen && !GAME.hasShot) {
    	GAME.hasShot = true;
		GAME.Entity.shoot(GAME.player);
    }

    for (var j=0; j<300; j++) {
    	for (var i = 0; i < GAME.bullets.length; i++) {
    		GAME.bullets[i].xvel *= 0.99999;
    		GAME.bullets[i].yvel *= 0.99999;
        	if (GAME.Entity.detectCollisions(GAME.bullets[i])) {
        		GAME.bullets[i].xvel *= 0.9999;
        		GAME.bullets[i].yvel *= 0.9999;
        	}
        	if (GAME.Entity.speedOf(GAME.bullets[i]) < 0.001) {
        		GAME.over = true;
        	}
    	}

    	// All bullets must step
    	for (var i = 0; i < GAME.bullets.length; i++) {
        	GAME.Entity.step(GAME.bullets[i]);
    	}
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
    if (GAME.over) {
    	GAME.end();
    } else {
    	setTimeout(GAME.main, GAME.framelength - delta);
    }
}

GAME.end = function() {
	var canvas = GAME.canvas;
	var ctx = GAME.ctx;

	ctx.clearRect(0, 0, canvas.width-1, canvas.height-1);
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0, 0, canvas.width, GAME.TILE_SCALE);
	ctx.fillRect(0, 0, GAME.TILE_SCALE, canvas.height);
	ctx.fillRect(0, canvas.height - GAME.TILE_SCALE,
	             canvas.width, GAME.TILE_SCALE);
	ctx.fillRect(canvas.width - GAME.TILE_SCALE, 0,
	             GAME.TILE_SCALE, canvas.height);

	ctx.font = "40px Arial";
	ctx.fillText("Score", canvas.width/2 - 25, canvas.height/2);
	ctx.fillText(GAME.kills, canvas.width/2 - 25, canvas.height/2 + 50);
}

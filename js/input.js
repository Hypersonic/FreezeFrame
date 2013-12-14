// You can compare to this with String.fromCharCode(event.keyCode)
GAME.setConsts({
    K_UP        : 'W',
    K_DOWN      : 'S',
    K_LEFT      : 'A',
    K_RIGHT     : 'D'
});

// These will be true if the key is pressed for them
GAME.setConsts({
    I_UP      : false,
    I_DOWN    : false,
    I_LEFT    : false,
    I_RIGHT   : false
});

// Create key listeners
GAME.keyDown = function(event) {
    var key = String.fromCharCode(event.keyCode);
    if (key == GAME.K_UP)    GAME.I_UP = true;
    if (key == GAME.K_DOWN)  GAME.I_DOWN = true;
    if (key == GAME.K_LEFT)  GAME.I_LEFT = true;
    if (key == GAME.K_RIGHT) GAME.I_RIGHT = true;
}

GAME.keyUp = function(event) {
    var key = String.fromCharCode(event.keyCode);
    if (key == GAME.K_UP)    GAME.I_UP = false;
    if (key == GAME.K_DOWN)  GAME.I_DOWN = false;
    if (key == GAME.K_LEFT)  GAME.I_LEFT = false;
    if (key == GAME.K_RIGHT) GAME.I_RIGHT = false;
}

GAME.mouseDown = function(event) {
	GAME.I_CLICK = true;
}

GAME.mouseUp = function(event) {
	GAME.I_CLICK = false;
}

GAME.mouseMove = function(event) {
	GAME.MOUSE_X = event.x;
	GAME.MOUSE_Y = event.y;
}

// Register with document
document.addEventListener('keydown',	GAME.keyDown, true);
document.addEventListener('keyup',		GAME.keyUp, true);
document.addEventListener('mousedown', 	GAME.mouseDown, true);
document.addEventListener('mouseup', 	GAME.mouseUp, true);
document.addEventListener('mousemove',	GAME.mouseMove, true);

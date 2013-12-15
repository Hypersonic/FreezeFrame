// You can compare to this with String.fromCharCode(event.keyCode)
GAME.setConsts({
    K_UP        : 'W',
    K_DOWN      : 'S',
    K_LEFT      : 'A',
    K_RIGHT     : 'D',
    K_SWITCH    : 'F',
    K_SPACE     : ' ',
    K_INCRES    : 'E',
    K_DECRES    : 'Q',
});

// These will be true if the key is pressed for them
GAME.setConsts({
    I_UP      : false,
    I_DOWN    : false,
    I_LEFT    : false,
    I_RIGHT   : false,
    I_SWITCH  : false,
    I_SPACE   : false,
    I_INCRES  : false,
    I_DECRES  : false,
});

// Create key listeners
GAME.keyDown = function(event) {
    var key = String.fromCharCode(event.keyCode);
    if (key == GAME.K_UP)    GAME.I_UP = true;
    if (key == GAME.K_DOWN)  GAME.I_DOWN = true;
    if (key == GAME.K_LEFT)  GAME.I_LEFT = true;
    if (key == GAME.K_RIGHT) GAME.I_RIGHT = true;
    if (key == GAME.K_SWITCH) GAME.I_SWITCH = true;
    if (key == GAME.K_SPACE) GAME.I_SPACE = true;
    if (key == GAME.K_INCRES) GAME.I_INCRES = true;
    if (key == GAME.K_DECRES) GAME.I_DECRES = true;
}

GAME.keyUp = function(event) {
    var key = String.fromCharCode(event.keyCode);
    if (key == GAME.K_UP)    GAME.I_UP = false;
    if (key == GAME.K_DOWN)  GAME.I_DOWN = false;
    if (key == GAME.K_LEFT)  GAME.I_LEFT = false;
    if (key == GAME.K_RIGHT) GAME.I_RIGHT = false;
    if (key == GAME.K_SWITCH) GAME.I_SWITCH = false;
    if (key == GAME.K_SPACE) GAME.I_SPACE = false;
    if (key == GAME.K_INCRES) GAME.I_INCRES = false;
    if (key == GAME.K_DECRES) GAME.I_DECRES = false;
}

GAME.mouseDown = function(event) {
	GAME.I_CLICK = true;
}

GAME.mouseUp = function(event) {
	GAME.I_CLICK = false;
}

GAME.mouseMove = function(event) {
	GAME.MOUSE_X = event.x - 9;
	GAME.MOUSE_Y = event.y - 29;
}

// Register with document
document.addEventListener('keydown',	GAME.keyDown, true);
document.addEventListener('keyup',		GAME.keyUp, true);
document.addEventListener('mousedown', 	GAME.mouseDown, true);
document.addEventListener('mouseup', 	GAME.mouseUp, true);
document.addEventListener('mousemove',	GAME.mouseMove, true);

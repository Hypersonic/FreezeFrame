GAME.AI = (function() {

	var followAI = function(entity) {
		var player = GAME.player,
		    dx = player.x - entity.x,
		    dy = player.y - entity.y;

		entity.angle = Math.atan2(dy, dx);
		GAME.Entity.move(entity, dx, dy);
	}

	return {
		followAI : followAI
	}
})();

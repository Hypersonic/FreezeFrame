GAME.AI = (function() {

	var followAI = function(entity) {
		var player = GAME.player,
		    dx = player.x - entity.x + Math.random() * 20 - 10,
		    dy = player.y - entity.y + Math.random() * 20 - 10;

		entity.angle = Math.atan2(dy, dx);
		entity.angle += Math.random();
		GAME.Entity.move(entity, dx, dy);
	}

	return {
		followAI : followAI
	}
})();

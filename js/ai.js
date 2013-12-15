GAME.setConsts({
	AI_FOLLOW  : 0,
	AI_SCATTER : 1,
	//AI_PREDICT : 2
});

GAME.AI = (function() {

	var followAI = function(entity) {
		var player = GAME.player,
		    dx = player.x - entity.x,
		    dy = player.y - entity.y;

		entity.angle = Math.atan2(dy, dx);
		entity.angle += Math.random();
		GAME.Entity.move(entity, dx, dy);
	}

	var scatterAI = function(entity) {
		var player = GAME.player,
		    dx = player.x - entity.x + Math.random() * 40 - 20,
		    dy = player.y - entity.y + Math.random() * 40 - 20;

		entity.angle = Math.atan2(dy, dx);
		entity.angle += Math.random();
		GAME.Entity.move(entity, dx, dy);
	}

	var predictAI = function(entity) {
		var player = GAME.player,
		    newX = player.x + player.xvel,
		    newY = player.y + player.yvel,
		    dx = newX - entity.x,
		    dy = newY - entity.y;

		entity.angle = Math.atan2(newY, newX);
		entity.angle += Math.random();
		GAME.Entity.move(entity, dx, dy);
	}

	return {
		followAI : followAI,
		scatterAI : scatterAI,
		predictAI : predictAI,
	}
})();

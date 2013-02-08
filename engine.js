"use strict";

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame   ||
	   window.webkitRequestAnimationFrame || 
       window.mozRequestAnimationFrame    || 
       window.oRequestAnimationFrame      || 
       window.msRequestAnimationFrame     || 
       function(callback, element){
           window.setTimeout(callback, 1000 / 60);
       };
})();

game.engine = {};

game.engine.startScreen = (function() {
	var tick = function() {};
	var draw = function() {};

	return {
		tick: tick,
		draw: draw
	}
})();

game.engine.gameScreen = (function() {
	var tick = function() {};
	var draw = function() {};

	return {
		tick: tick,
		draw: draw
	}
})();

game.engine.main = (function() {
	var currentMode = game.engine.startScreen;

	var state = function(state) {
		if (state==="game") {
			currentMode = game.engine.gameScreen;
		} else {
			currentMode = game.engine.startScreen;
		}
	}

	var tick = function() {
		currentMode.tick();
		currentMode.draw();
		requestAnimFrame(game.engine.main.tick);
	}

	return {
		state: state, 
		tick: tick
	}
})();
"use strict";

window.onload = function() {
	game.ctx = document.getElementById('mycanvas').getContext('2d');
	game.engine.main.tick();
};

"use strict";

window.onload = function() {
    game.ctx = document.getElementById('mycanvas').getContext('2d');

    $(document).bind('keydown', function(event) {
        game.controls.handlers.keydown(event);
    });
    $(document).bind('keyup', function(event) {
        game.controls.handlers.keyup(event);
    });
    $('#mycanvas').mousedown(function(event) {
        game.controls.handlers.mouseclick(event);
    });
    $('#mycanvas').mousemove(function(event) {
        game.controls.handlers.mousemove(event);
    });
    $('#mycanvas').mouseout(function(event) {
        game.controls.handlers.mouseout();
    });
    
    game.engine.main.tick();
};

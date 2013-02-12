"use strict";

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function (callback, element) {
            window.setTimeout(callback, 1000 / 60);
        };
}());

game.engine = {};

game.engine.startScreen = (function () {
    var frames = 0, x = 200, y = 200;

    function tick() {
        var move = null;

        frames = frames + 1;
        move = game.controls.getMovement();
        x += move[0];
        y += move[1];
    }
    function draw() {
        game.ctx.clearRect(0, 0, game.ctx.canvas.width, game.ctx.canvas.height);
        game.ctx.fillStyle = "20pt Arial Sans-serif";
        game.ctx.fillText("Start Screen: " + frames, x, y);
    }

    return {
        tick: tick,
        draw: draw
    };
}());

game.engine.gameScreen = (function () {
    var frames = 0, x = 200, y = 200;

    function tick() {
        var move = null;

        frames = frames + 1;
        move = game.controls.getMovement();
        x += move[0];
        y += move[1];
    }
    function draw() {
        game.ctx.clearRect(0, 0, game.ctx.canvas.width, game.ctx.canvas.height);
        game.ctx.fillStyle = "20pt Arial Sans-serif";
        game.ctx.fillText("Game Screen: " + frames, x, y);
    }

    return {
        tick: tick,
        draw: draw
    };
}());

game.engine.main = (function () {
    var currentMode = game.engine.startScreen, timerDebug = false, frameNum = 0, frametime = null;

    frametime = {
        start: null,
        prev: null,
        now: null,
        current: null,
        sum: 0,
        maxVal: 0
    };

    function debug(debugging) {
        if (typeof debugging !== 'boolean') {
            timerDebug = !timerDebug;
        } else {
            timerDebug = debugging;
        }
    }

    function state(newState) {
        if (newState === "game") {
            currentMode = game.engine.gameScreen;
        } else {
            currentMode = game.engine.startScreen;
        }
    }

    function tick() {
        frametime.start = new Date().valueOf();

        currentMode.tick();
        currentMode.draw();

        frameNum = frameNum + 1;
        if (frameNum > 59) {
            if (timerDebug) {
                console.log('Average % of allowed time used by frames:', frametime.sum / 60, '\nHighest % of allowed time used by a frame:', frametime.maxVal);
            }
            frameNum = 0;
            frametime.sum = 0;
            frametime.maxVal = 0;
        }
        frametime.prev = frametime.now;
        frametime.now = new Date().valueOf();
        frametime.current = ((frametime.now - frametime.start) / (frametime.now - frametime.prev) * 100);
        frametime.sum = frametime.sum + frametime.current;
        if (frametime.current > frametime.maxVal) { frametime.maxVal = frametime.current; }
        window.requestAnimFrame(game.engine.main.tick);
    }

    return {
        debug: debug,
        state: state,
        tick: tick
    };
}());

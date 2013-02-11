"use strict";

game.controls = (function() {
    var cursorPos = {x: 0, y: 0, visible: false}
    var clicked = false;
    var clickPos = {x:null, y:null};
    var keys = [];
    var escPressed = false;
    var anykey = false;
    for (var i=0; i<256; i++) {
        keys[i] = false;
    }

    function up () {
        return keys[38] || keys[175] || keys[87];
    }
    
    function down() {
        return keys[40] || keys[176] || keys[83];
    }

    function left() {
        return keys[37] || keys[178] || keys[65];
    }

    function right() {
        return keys[39] || keys[177] || keys[68];
    }

    function keydown(keyevent) {
        if (keyevent.which === 27) {
            escPressed = true;
        }
        keys[keyevent.which] = true;
        anykey = true;
    }
    function keyup(keyevent) {
        keys[keyevent.which] = false;
    }
    function getMovement() {
        var movement = [0, 0];
        if(up()) {
            movement[1] = -1;
        }
        if(down()) {
            movement[1] = 1;
        }
        if(left()) {
            movement[0] = -1;
        }
        if(right()) {
            movement[0] = 1;
        }
        anykey = false;
        return movement;
    }
    function getDeltaMovement(speed) {
        var movement = getMovement();
        if (typeof speed!=='number' || speed <= 0) {
            return movement;
        } else {
            if(movement[0]!==0 && movement[1]!==0) {
                movement[0] = movement[0] * speed * 0.707;
                movement[1] = movement[1] * speed * 0.707; 
            } else {
                movement[0] = movement[0] * speed;
                movement[1] = movement[1] * speed;
            }
            return movement;
        }
    }


    function mouseclick(mouseEvent) {
        clicked = true;
        clickPos.x = mouseEvent.offsetX;
        clickPos.y = mouseEvent.offsetY;
    }
    
    function getClick() {
        if (clicked) {
            clicked = false;
            return true
        } else {
            return false;
        }
    }
    
    function getClickPos() {
        return clickPos;
    }
    
    function mousemove(mouseEvent) {
        cursorPos.x = mouseEvent.offsetX;
        cursorPos.y = mouseEvent.offsetY;
        cursorPos.visible = true;
    }
    function mouseout() {
        cursorPos.visible = false;
    }
    function getCursorPos() {
        return cursorPos;
    }
    function getAnyKey() {
        if (anykey) {
            anykey = false;
            return true;
        } else {
            return false;
        }
    }
    function getEsc() {
        if (escPressed) {
            escPressed = false;
            return true;
        }
        else {
            return false
        }
    }
    function clearKeys() {
        for (var i=0; i<256; i++) {
            keys[i] = false;
        }
        escPressed = false;
        anykey = false;
    }
    return {
        handlers: {
            keyup : keyup,
            keydown : keydown,
            mousemove : mousemove,
            mouseclick : mouseclick,
            mouseout: mouseout
        }, 
        getMovement: getMovement,
        getDeltaMovement: getDeltaMovement,
        getCursorPos: getCursorPos,
        getClick: getClick,
        getClickPos: getClickPos,
        getAnyKey: getAnyKey,
        getEsc: getEsc,
        clearKeys: clearKeys
    }
})();
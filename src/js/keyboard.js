down = {};
onkeydown = e => {
    down[e.keyCode] = true;
};
onkeyup = e => {
    down[e.keyCode] = false;
};
onblur = oncontextmenu = () => down = {};

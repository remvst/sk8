down = {};
onkeydown = e => {
    down[e.keyCode] = true;
};
onkeyup = e => {
    down[e.keyCode] = false;
};
onblur = oncontextmenu = () => down = {};

if (DEBUG) {
    addEventListener('keyup', e => {
        if (e.keyCode === KEYBOARD_N) {
            G.nextScene();
        }
    }, false);
}

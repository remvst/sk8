TOUCHES = [];
RELATIVE_TOUCHES = [];

ontouchstart = ontouchmove = ontouchend = ontouchcancel = e => {
    e.preventDefault();

    TOUCHES = Array.from(e.touches);
    RELATIVE_TOUCHES = TOUCHES.map(x => toGamePosition(x, {}));

    // Update mouse position
    if (TOUCHES.length) {
        MOUSE_POSITION.x = RELATIVE_TOUCHES[0].x;
        MOUSE_POSITION.y = RELATIVE_TOUCHES[0].y;
    }
};

ontouchend = (e) => {
    e.preventDefault();
    if (TOUCHES.length) {
        onclick();
    }
    ontouchmove(e);
}

mobileDirection = () => {
    const axisValue = gamepadAxisValue(0);
    if (abs(axisValue) > 0) return axisValue;

    if (RELATIVE_TOUCHES.filter(x => between(0, x.x, CANVAS_WIDTH / 4)).length) return -1;
    if (RELATIVE_TOUCHES.filter(x => between(CANVAS_WIDTH / 4, x.x, CANVAS_WIDTH / 2)).length) return 1;
    return 0;
};

mobileTrick = () => {
    return RELATIVE_TOUCHES.filter(x => between(evaluate(CANVAS_WIDTH / 2), x.x, evaluate(CANVAS_WIDTH * 3 / 4))).length;
};

mobileSquat = () => {
    return RELATIVE_TOUCHES.filter(x => between(evaluate(CANVAS_WIDTH * 3 / 4), x.x, CANVAS_WIDTH)).length;
};

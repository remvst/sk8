MOUSE_POSITION = {'x': 0, 'y': 0};
MOUSE_IS_DOWN = false;

onmousemove = e => {
    const canvasCoords = CANVAS.getBoundingClientRect();

    MOUSE_POSITION.x = CANVAS_WIDTH * (e.pageX - canvasCoords.left) / canvasCoords.width;
    MOUSE_POSITION.y = CANVAS_HEIGHT * (e.pageY - canvasCoords.top) / canvasCoords.height;
};

onmousedown = () => MOUSE_IS_DOWN = true;
onmouseup = () => MOUSE_IS_DOWN = false;

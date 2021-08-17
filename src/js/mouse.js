MOUSE_POSITION = new Point();
PREVIOUS_MOUSE_POSITION = new Point();
MOUSE_IS_DOWN = false;

MOVEMENT_TARGET_DIRECTION = new Point();
ROTATION_ACC = 0;

onmousemove = e => {
    const canvasCoords = CANVAS.getBoundingClientRect();

    PREVIOUS_MOUSE_POSITION.x = MOUSE_POSITION.x;
    PREVIOUS_MOUSE_POSITION.y = MOUSE_POSITION.y;

    MOUSE_POSITION.x = CANVAS_WIDTH * (e.pageX - canvasCoords.left) / canvasCoords.width;
    MOUSE_POSITION.y = CANVAS_HEIGHT * (e.pageY - canvasCoords.top) / canvasCoords.height;

    const movementX = e.movementX || MOUSE_POSITION.x - PREVIOUS_MOUSE_POSITION.x;
    const movementY = e.movementY || MOUSE_POSITION.y - PREVIOUS_MOUSE_POSITION.y;

    const hero = G && G.world.hero;

    if (hero && hero.draggable) {
        MOVEMENT_TARGET_DIRECTION.x = limit(-400, MOVEMENT_TARGET_DIRECTION.x + movementX, 400);
        MOVEMENT_TARGET_DIRECTION.y = limit(-400, MOVEMENT_TARGET_DIRECTION.y + movementY, 400);

        const angle = atan2(MOVEMENT_TARGET_DIRECTION.y, MOVEMENT_TARGET_DIRECTION.x);
        const dist = min(400, distP(0, 0, MOVEMENT_TARGET_DIRECTION.x, MOVEMENT_TARGET_DIRECTION.y));
        MOVEMENT_TARGET_DIRECTION.x = cos(angle) * dist;
        MOVEMENT_TARGET_DIRECTION.y = sin(angle) * dist;

        ROTATION_ACC = 0;
    } else {
        ROTATION_ACC = limit(-1, ROTATION_ACC + movementX / 200, 1);
    }
};

onmousedown = () => {
    MOUSE_IS_DOWN = true;
    document.body.requestPointerLock();
};
onmouseup = () => {
    MOUSE_IS_DOWN = false;
    WAIT_FOR_RELEASE = false;
};

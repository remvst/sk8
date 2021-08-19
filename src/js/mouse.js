MOUSE_POSITION = new Point();
PREVIOUS_MOUSE_POSITION = new Point();
MOUSE_IS_DOWN = false;

MOVEMENT_TARGET_DIRECTION = new Point();
ROTATION_ACC = 0;

onmousemove = e => {
    const canvasCoords = CANVAS.getBoundingClientRect();

    PREVIOUS_MOUSE_POSITION.x = MOUSE_POSITION.x;
    PREVIOUS_MOUSE_POSITION.y = MOUSE_POSITION.y;

    if (document.pointerLockElement) {
        MOUSE_POSITION.x += e.movementX;
        MOUSE_POSITION.y += e.movementY;
    } else {
        MOUSE_POSITION.x = CANVAS_WIDTH * limit(0, (e.pageX - canvasCoords.left) / canvasCoords.width, 1);
        MOUSE_POSITION.y = CANVAS_HEIGHT * limit(0, (e.pageY - canvasCoords.top) / canvasCoords.height, 1);
    }

    const movementX = e.movementX || MOUSE_POSITION.x - PREVIOUS_MOUSE_POSITION.x;
    const movementY = e.movementY || MOUSE_POSITION.y - PREVIOUS_MOUSE_POSITION.y;

    const hero = G && G.scene.world.hero;

    if (hero && hero.draggable) {
        MOVEMENT_TARGET_DIRECTION.x += movementX;
        MOVEMENT_TARGET_DIRECTION.y += movementY;

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
onmouseup = () => MOUSE_IS_DOWN = false;

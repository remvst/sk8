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
        MOUSE_POSITION.x = CANVAS_WIDTH * (e.pageX - canvasCoords.left) / canvasCoords.width;
        MOUSE_POSITION.y = CANVAS_HEIGHT * (e.pageY - canvasCoords.top) / canvasCoords.height;
    }

    MOUSE_POSITION.x = limit(0, MOUSE_POSITION.x, CANVAS_WIDTH);
    MOUSE_POSITION.y = limit(0, MOUSE_POSITION.y, CANVAS_HEIGHT);

    const deltaX = MOUSE_POSITION.x - PREVIOUS_MOUSE_POSITION.x;
    const deltaY = MOUSE_POSITION.y - PREVIOUS_MOUSE_POSITION.y;

    const hero = G && G.scene.world.hero;

    if (hero && hero.draggable) {
        MOVEMENT_TARGET_DIRECTION.x += deltaX;
        MOVEMENT_TARGET_DIRECTION.y += deltaY;

        const angle = atan2(MOVEMENT_TARGET_DIRECTION.y, MOVEMENT_TARGET_DIRECTION.x);
        const dist = min(400, distP(0, 0, MOVEMENT_TARGET_DIRECTION.x, MOVEMENT_TARGET_DIRECTION.y));
        MOVEMENT_TARGET_DIRECTION.x = cos(angle) * dist;
        MOVEMENT_TARGET_DIRECTION.y = sin(angle) * dist;

        ROTATION_ACC = 0;
    } else {
        ROTATION_ACC = limit(-1, ROTATION_ACC + deltaX / 200, 1);
    }
};

onmousedown = () => {
    MOUSE_IS_DOWN = true;
    document.body.requestPointerLock();
};
onmouseup = () => MOUSE_IS_DOWN = false;

onclick = () => {
    if (G.menu) {
        G.menu.buttons.forEach(button => {
            if (button.contains(MOUSE_POSITION)) {
                button.onClick();
            }
        });
    }
}

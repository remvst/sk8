MOUSE_POSITION = point();
PREVIOUS_MOUSE_POSITION = point();
MOUSE_IS_DOWN = false;

MOVEMENT_TARGET_DIRECTION = point();
ROTATION_ACC = 0;

toGamePosition = (e, out) => {
    const canvasCoords = CANVAS.getBoundingClientRect();

    const height = CANVAS_HEIGHT + MOBILE * MOBILE_CONTROLS_HEIGHT;
    if (DOCUMENT.pointerLockElement) {
        out.x += CANVAS_WIDTH * e.movementX / canvasCoords.width;
        out.y += height * e.movementY / canvasCoords.height;
    } else {
        out.x = CANVAS_WIDTH * (e.pageX - canvasCoords.left) / canvasCoords.width;
        out.y = height * (e.pageY - canvasCoords.top) / canvasCoords.height;
    }

    out.x = limit(0, out.x, CANVAS_WIDTH);
    out.y = limit(0, out.y, CANVAS_HEIGHT);

    return out;
};

onmousemove = e => {
    if (MOBILE) return;

    PREVIOUS_MOUSE_POSITION.x = MOUSE_POSITION.x;
    PREVIOUS_MOUSE_POSITION.y = MOUSE_POSITION.y;

    toGamePosition(e, MOUSE_POSITION)

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
    DOCUMENT.body.requestPointerLock();
};
onmouseup = () => MOUSE_IS_DOWN = false;

onclick = () => {
    if (G.menu) {
        G.menu.menuButtons.forEach(x => {
            if (x.contains(MOUSE_POSITION)) {
                clickSound();
                x.onClick();
            }
        });
    }
}

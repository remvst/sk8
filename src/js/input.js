INPUT = {
    'squat': () => MOUSE_IS_DOWN,
    'trick': () => down[KEYBOARD_SPACE],
    'direction': () => {
        // if (down[KEYBOARD_LEFT] || down[KEYBOARD_A] || down[KEYBOARD_Q] || isGamepadButtonPressed(14)) return -1;
        // if (down[KEYBOARD_RIGHT] || down[KEYBOARD_D] || isGamepadButtonPressed(15)) return 1;
        //
        // const axisValue = gamepadAxisValue(0);
        // if (abs(axisValue) > 0) return axisValue;

        return atan2(MOVEMENT_TARGET_DIRECTION.y, MOVEMENT_TARGET_DIRECTION.x);
        // return INPUT.directionAcc;
        // return atan2(MOUSE_POSITION.y - CANVAS_HEIGHT / 2, MOUSE_POSITION.x - CANVAS_WIDTH / 2);
        // return limit(-1, (MOUSE_POSITION.x - G.previousMousePosition.x) / (innerWidth / 10), 1);
     },
     'rotation': () => {
         return ROTATION_ACC;
     },

     'directionAcc': 0,

    // TODO fix gamepad buttons and axises
    // 'up': () => down[KEYBOARD_UP] || down[KEYBOARD_W] || down[KEYBOARD_Z] || isGamepadButtonPressed(15) || isGamepadAxisNearValue(0, 1),
    // 'down': () => down[KEYBOARD_DOWN] || down[KEYBOARD_S] || isGamepadButtonPressed(15) || isGamepadAxisNearValue(0, 1),
};

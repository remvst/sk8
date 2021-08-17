WAIT_FOR_RELEASE = false;

INPUT = {
    'squat': () => MOUSE_IS_DOWN,
    'trick': () => down[KEYBOARD_SPACE],
    'direction': () => {
        if (down[KEYBOARD_LEFT] || down[KEYBOARD_A] || down[KEYBOARD_Q] || isGamepadButtonPressed(14)) return -1;
        if (down[KEYBOARD_RIGHT] || down[KEYBOARD_D] || isGamepadButtonPressed(15)) return 1;

        const axisValue = gamepadAxisValue(0);
        if (abs(axisValue) > 0) return axisValue;

        return atan2(MOVEMENT_TARGET_DIRECTION.y, MOVEMENT_TARGET_DIRECTION.x);
     },
     'rotation': () => {
         const axisValue = gamepadAxisValue(0);
         if (abs(axisValue) > 0) return axisValue;

         return ROTATION_ACC;
     },
     'grind': () => MOUSE_IS_DOWN,
     'directionAcc': 0,
};

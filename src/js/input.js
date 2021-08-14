INPUT = {
    'shoot': () => down[KEYBOARD_SPACE] || MOUSE_IS_DOWN,
    'left': () => down[KEYBOARD_LEFT] || down[KEYBOARD_A] || down[KEYBOARD_Q] || isGamepadButtonPressed(14) || isGamepadAxisNearValue(0, -1),
    'right': () => down[KEYBOARD_RIGHT] || down[KEYBOARD_D] || isGamepadButtonPressed(15) || isGamepadAxisNearValue(0, 1),

    // TODO fix gamepad buttons and axises
    'up': () => down[KEYBOARD_UP] || down[KEYBOARD_W] || down[KEYBOARD_Z] || isGamepadButtonPressed(15) || isGamepadAxisNearValue(0, 1),
    'down': () => down[KEYBOARD_DOWN] || down[KEYBOARD_S] || isGamepadButtonPressed(15) || isGamepadAxisNearValue(0, 1),
};

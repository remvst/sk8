WAIT_FOR_RELEASE = false;

class Input {
    squat() {
        return MOUSE_IS_DOWN;
    }

    grind() {
        return MOUSE_IS_DOWN;
    }

    trick() {
        return down[KEYBOARD_SPACE];
    }

    pushing() {
        return down[KEYBOARD_SPACE];
    }

    direction() {
        const axisValue = gamepadAxisValue(0);
        if (abs(axisValue) > 0) return axisValue;

        return atan2(MOVEMENT_TARGET_DIRECTION.y, MOVEMENT_TARGET_DIRECTION.x);
    }

    rotation() {
        const axisValue = gamepadAxisValue(0);
        if (abs(axisValue) > 0) return axisValue;

        return ROTATION_ACC;
    }
}

class Input {
    get userControlled() {
        return true;
    }

    squat() {
        return MOUSE_IS_DOWN || mobileSquat();
    }

    grind() {
        return MOUSE_IS_DOWN || mobileSquat();
    }

    trick() {
        return down[KEYBOARD_SPACE] || mobileTrick();
    }

    pushing() {
        if (RELATIVE_TOUCHES.filter(x => between(CANVAS_WIDTH / 2, x.x, CANVAS_WIDTH * 3 / 4)).length) return true;
        return down[KEYBOARD_SPACE] || mobileTrick();
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

class EmptyInput {
    get userControlled() {
        return false;
    }

    squat() {
        return false;
    }

    grind() {
        return false;
    }

    trick() {
        return false;
    }

    pushing() {
        return false;
    }

    direction() {
        return 0;
    }

    rotation() {
        return 0;
    }
}

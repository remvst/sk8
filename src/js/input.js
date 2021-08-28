class Input {
    get userControlled() {
        return true;
    }

    squat() {
        return MOUSE_IS_DOWN || mobileSquat() || isGamepadButtonPressed(0);
    }

    grind() {
        return this.squat();
    }

    trick() {
        if (isGamepadButtonPressed(1) || isGamepadButtonPressed(2)) return true;
        return down[KEYBOARD_SPACE] || mobileTrick();
    }

    pushing() {
        return this.trick();
    }

    direction() {
        return atan2(MOVEMENT_TARGET_DIRECTION.y, MOVEMENT_TARGET_DIRECTION.x);
    }

    rotation() {
        if (mobileDirection()) {
            ROTATION_ACC = mobileDirection() * 0.5;
        }

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

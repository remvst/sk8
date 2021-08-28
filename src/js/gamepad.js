gamepads = () => (navigator.getGamepads ? Array.from(navigator.getGamepads()) : []).filter(x => !!x);

isGamepadButtonPressed = buttonIndex => {
    const pads = gamepads();
    for (var i = 0; i < pads.length; i++) {
        try {
            if (pads[i].buttons[buttonIndex].pressed) {
                return true;
            }
        } catch (e) {}
    }
};

gamepadAxisValue = (axisIndex) => {
    const pads = gamepads();
    for (var i = 0; i < pads.length; i++) {
        try {
            const value = pads[i].axes[axisIndex];
            if (abs(value) < 0.1) return 0;
            return pads[i].axes[axisIndex];
        } catch (e) {}
    }
    return 0;
};

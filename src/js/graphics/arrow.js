renderArrow = () => {
    R.fillStyle = COLOR_WHITE;
    R.globalAlpha = 0.2;
    beginPath();

    moveTo(0, 0);
    lineTo(-50, -50);
    lineTo(-50, -25);
    lineTo(-100, -25);
    lineTo(-100, 25);
    lineTo(-50, 25);
    lineTo(-50, 50);
    fill();
}

renderMobileArrow = () => {
    beginPath();
    moveTo(MOBILE_BUTTON_SIZE / 2, 0);
    lineTo(-MOBILE_BUTTON_SIZE / 2, MOBILE_BUTTON_SIZE / 2);
    lineTo(-MOBILE_BUTTON_SIZE / 2, -MOBILE_BUTTON_SIZE / 2);
    fill();
};

renderArrow = () => {
    R.fillStyle = '#fff';
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

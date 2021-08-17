class Renderable {

    constructor() {
        this.visible = true;
    }

    clone() {

    }

    animateToGround() {

    }

    makePointsFall(points, origin) {
        const angle = rnd(-1, 1) * PI / 32 + atan2(points[0].y - origin.y, points[0].x - origin.x);
        const distance = 100 + random() * 100;
        const duration = 0.5;

        points.forEach(point => {
            interp(point, 'x', point.x, point.x + cos(angle) * distance, duration, 0, easeOutQuad);
            interp(point, 'y', point.y, point.y + sin(angle) * distance, duration, 0, easeOutQuad);
            interp(point, 'z', point.z, 0, duration, 0, easeOutBounce);
        });
    }

    renderOnTopOfHero(hero) {
        if (hero === this) {
            return false;
        }
    }
}

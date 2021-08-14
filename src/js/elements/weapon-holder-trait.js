class WeaponHolderTrait extends Trait {
    constructor() {
        super();
        this.lastShot = 0;
    }

    get key() {
        return 'weapon-holder'
    }

    cycle(elapsed) {
        if (this.triggerDown) {
            this.shoot();
        }
    }

    render() {
        fs('#000');

        path(() => {
            doodleFactor(2);
            rotate(this.angle);

            if (cos(this.angle) < 0) {
                scale(1, -1);
            }

            rectangle(60, -15, 50, 10);
            rectangle(60, -5, 10, 10);
            fill();
        }).stroke();
    }

    shoot() {
        if (this.age - this.lastShot > 0.1) {
            this.lastShot = this.age;

            this.panel.addElement(new Element([
                new BulletTrait(),
                new AutoDisappearTrait(),
            ], initPosition(
                this.x + cos(this.angle) * 70,
                this.y + sin(this.angle) * 70,
                this.angle,
            )));
        }
    }
}

class World {
    constructor() {
        this.age = 0;
        this.elements = [];
        this.particles = [];

        this.backgroundColor = '#170e65';

        this.camera = new Camera();
    }

    addElement(element) {
        if (element instanceof Hero) {
            this.hero = element;
            this.camera.followedTarget = element;
        }

        element.world = this;
        this.elements.push(element);
        return element;
    }

    removeElement(element) {
        remove(this.elements, element);
    }

    cycle(elapsed) {
        this.age += elapsed;
        this.elements.forEach(e => e.cycle(elapsed * G.gameSpeed));
        this.camera.cycle(elapsed);
    }

    renderRenderables(list, condition) {
        list.forEach(renderable => wrap(() => {
            if (condition(renderable)) renderable.renderActual();
        }));
    }

    render() {
        this.elements.forEach(e => e.prerender());

        wrap(() => {
            fs(this.backgroundColor);
            fr(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            translate(-this.camera.x, -this.camera.y);

            fs(groundTexture);
            fr(this.camera.x, this.camera.y, CANVAS_WIDTH * 2, CANVAS_HEIGHT * 2);

            const before = [];
            const after = [];
            for (const element of this.elements) {
                for (const renderable of element.renderables) {
                    wrap(() => renderable.renderShadow());

                    if (this.hero && renderable === this.hero.renderables[0] || !renderable.visible) {
                        continue;
                    }

                    if (!this.hero || !renderable.renderOnTopOfHero(this.hero)) {
                        before.push(renderable);
                    } else {
                        after.push(renderable);
                    }
                }
            }

            before.forEach(renderable => wrap(() => renderable.renderActual()));
            this.particles.forEach(particle => wrap(() => particle.render()));
            if (this.hero && !this.hero.bailed) wrap(() => this.hero.renderables[0].renderActual());
            after.forEach(renderable => wrap(() => renderable.renderActual()));
        });

        if (this.hero.input.userControlled && this.hero.grinding) {
            wrap(() => {
                R.lineWidth = 20;
                translate(this.hero.center.projectToActual().x - this.camera.x, this.hero.center.projectToActual().y - this.camera.y);
                rotate(-PI / 2);
                ss(COLOR_WHITE);
                beginPath();
                arc(0, 0, 200, -PI / 4, PI / 4);
                stroke();

                rotate(this.hero.balance * PI / 4);
                translate(200, 0);
                beginPath();
                fs('#f00');
                moveTo(0, 0);
                lineTo(40, 20);
                lineTo(40, -20);
                fill();
            })
        }
    }

    particle(properties) {
        let particle;
        properties.onFinish = () => remove(this.particles, particle);
        this.particles.push(particle = new Particle(properties));
    }

    rail(pts) {
        return this.addElement(new Rail(pts));
    }

    pole(pt) {
        const p = new Pole();
        p.x = pt.x;
        p.y = pt.y;
        return this.addElement(p);
    }

    kicker(pt, angle) {
        const k = new Kicker();
        k.x = pt.x;
        k.y = pt.y;
        k.angle = angle;
        return this.addElement(k);
    }

    arcRail(center, radius, count, fromAngle, toAngle, z = 100) {
        const pts = [];
        for (let i = 0 ; i <= count ; i++) {
            const angle = (i / count) * (toAngle - fromAngle) + fromAngle;
            pts.push(point(
                center.x + cos(angle) * radius,
                center.y + sin(angle) * radius,
                z,
            ));
        }
        return this.addElement(new Rail(pts));
    }

    tape(center) {
        const tape = new Tape();
        tape.x = center.x;
        tape.y = center.y;
        tape.z = center.z;
        return this.addElement(tape);
    }

    addFeature(elements, transformation) {
        elements.forEach((x) => {
            this.removeElement(x);
            this.addElement(x.transformed(transformation));
        });
    }
}

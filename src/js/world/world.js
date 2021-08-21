class World {
    constructor() {
        this.age = 0;
        this.elements = [];
        this.particles = [];

        this.camera = new Camera();
    }

    addElement(element) {
        if (element instanceof Hero) {
            this.hero = element;
            this.camera.followedTarget = element;
        }

        element.world = this;
        this.elements.push(element);
    }

    removeElement(element) {
        if (this.hero == element) {
            // this.simulatedHero.hero = null;
            // this.hero = null;
        }

        remove(this.elements, element);
    }

    cycle(elapsed) {
        this.age += elapsed;
        this.elements.forEach(e => e.cycle(elapsed));
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
            translate(-this.camera.x, -this.camera.y);

            fs(groundTexture);
            fr(this.camera.x, this.camera.y, CANVAS_WIDTH * 2, CANVAS_WIDTH * 2);

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
    }

    particle(properties) {
        let particle;
        properties.onFinish = () => remove(this.particles, particle);
        this.particles.push(particle = new Particle(properties));
    }

    rail(pts) {
        this.addElement(new Rail(pts));
    }

    pole(pt) {
        const p = new Pole();
        p.x = pt.x;
        p.y = pt.y;
        this.addElement(p);
    }

    kicker(pt, angle) {
        const k = new Kicker();
        k.x = pt.x;
        k.y = pt.y;
        k.angle = angle;
        this.addElement(k);
    }

    arcRail(center, radius, count, fromAngle, toAngle) {
        const pts = [];
        for (let i = 0 ; i <= count ; i++) {
            const angle = (i / count) * (toAngle - fromAngle) + fromAngle;
            pts.push(point(
                center.x + cos(angle) * radius,
                center.y + sin(angle) * radius,
                100,
            ));
        }
        this.addElement(new Rail(pts));
    }
}

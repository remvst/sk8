class Panel {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.scale = 1;
        this.panelWidth = w;
        this.panelHeight = h;

        this.mousePosition = {'x': 0, 'y': 0};

        this.reset();
        this.start();
    }

    get visualWidth() { return this.panelWidth / this.scale; }
    get visualHeight() { return this.panelHeight / this.scale; }

    addElement(x, first) {
        if (first) {
            this.elements.unshift(x);
        } else {
            this.elements.push(x);
        }
        x.bind(this);

        if (x.trait('hero')) {
            this.hero = x;
        }

        return x;
    }

    removeElement(x) {
        remove(this.elements, x);
    }

    focus(interpDuration = 0) {
        interp(G.camera, 'centerX', G.camera.centerX, this.x + this.panelWidth / 2, interpDuration, 0, easeInOutQuad);
        interp(G.camera, 'centerY', G.camera.centerY, this.y + this.panelHeight / 2, interpDuration, 0, easeInOutQuad);
    }

    reset() {
        this.rng = createNumberGenerator(1);

        this.elements = [];

        this.caption = null;

        this.scribbleProgress = 0;
        this.scribbleAlpha = 0;
        this.age = 0;
    }

    restart() {
        this.focus(1);

        this.reset();

        interp(this, 'scribbleProgress', 0, 1, 1);
        interp(this, 'scribbleAlpha', 1, 0, 0.2, 1.5);
        this.start();
    }

    start() {

    }

    nextPanel() {
        const index = G.panels.indexOf(this);
        G.startPanel(G.panels[(index + 1) % G.panels.length]);
        // TODO
    }

    cycle(elapsed) {
        this.age += elapsed;

        this.mousePosition.x = (MOUSE_POSITION.x - this.x + G.camera.x) / this.scale;
        this.mousePosition.y = (MOUSE_POSITION.y - this.y + G.camera.y) / this.scale;

        this.elements.forEach(x => x.cycle(elapsed));
    }

    render() {
        this.detailsRng = createNumberGenerator(2);

        wrap(() => {
            translate(this.x, this.y);

            this.renderInkDrops();

            wrap(() => {
                rect(0, 0, this.panelWidth, this.panelHeight);
                clip();

                this.renderBackground();
                wrap(() => {
                    scale(this.scale, this.scale);
                    this.renderContent();
                });
                this.renderCaption();
            });

            this.renderEdges();
        });
    }

    renderInkDrops() {
        fs('blue');
        for (let i = 0 ; i < 10 ; i++) {
            path(() => {
                translate(
                    this.detailsRng.between(0, this.panelWidth),
                    this.detailsRng.between(0, this.panelHeight),
                );

                R.globalAlpha = this.detailsRng.between(0.1, 0.5);
                arc(0, 0, this.detailsRng.between(5, 20), 0, PI * 2);
                fill()
            });
        }
    }

    renderBackground() {

    }

    renderContent() {
        this.elements.forEach(x => x.render());
    }

    renderCaption() {
        if (this.caption) {
            const w = stringWidth(this.caption, 20, 10);;

            R.lineWidth = 4;

            fs('#fff');
            ss('#000');
            path(() => {
                rectangle(0, 0, w + 40, 70);
                fill();
            }).stroke()

            doodleFactor(2);
            translate(20, 20);
            renderString(this.caption, 20, 30, 10);
        }
    }

    renderEdges() {
        ss('#000');

        closedPath(() => {
            rectangle(0, 0, this.panelWidth, this.panelHeight);
        }).stroke();

        if (this.scribbleAlpha > 0) {
            R.lineWidth = 80;
            R.globalAlpha = this.scribbleAlpha;
            scribble(0, 0, this.panelWidth, this.panelHeight, this.scribbleProgress, 50);
        }
    }

    scribbleBackground(color, alpha = 0.5) {
        wrap(() => {
            doodleFactor(10);
            R.lineWidth = 40;
            R.globalAlpha = alpha;
            ss(color);
            scribble(40, 40, this.panelWidth - 80, this.panelHeight - 80, 1, 30);
        });
    }

    grassBackground(color = '#0f0') {
        ss(color);
        for (let i = 0 ; i < 20 ; i++) {
            path(() => {
                doodleFactor(10);
                translate(this.detailsRng.between(0, this.panelWidth), this.detailsRng.between(0, this.panelHeight));
                line(-50, 0, 50, 0);
            }).stroke();
        }
    }

    spawnRock(x, y) {
        this.addElement(new Element([
            new RockTrait(),
            new CollidableTrait(50, 999),
        ], initPosition(x, y)));
    }

    spawnHero(x, y) {
        this.addElement(new Element([
            new CharacterTrait('hero'),
            new HeroTrait(),
            new BoundTrait(50),
            new WeaponHolderTrait(),
            new CollidableTrait(50, 1),
        ], initPosition(x, y)));
    }

    fillRectangle(x, y, w, h, count, spawn) {
        for (let i = 0 ; i < count ; i++) {
            spawn(
                this.rng.between(x, x + w),
                this.rng.between(y, y + h),
            );
        }
    }
}

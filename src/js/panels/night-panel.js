class NightPanel extends Panel {
    start() {
        this.scale = 0.5;

        this.spawnHero(this.visualWidth / 2, this.visualHeight / 2);

        this.fillRectangle(0, 0, this.visualWidth, this.visualHeight, 20, (x, y) => {
            this.spawnRock(x, y);
        });
    }

    renderBackground() {
        this.scribbleBackground('#db588d');
    }

    renderContent() {
        super.renderContent();

        R.lineWidth = 100;
        const radius = 300;
        scribble(0, 0, this.hero.x - radius, this.visualHeight, 1, 80);
        scribble(this.hero.x + radius, 0, this.visualWidth - (this.hero.x + radius), this.visualHeight, 1, 80);
        scribble(this.hero.x - radius, 0, radius * 2, this.hero.y - radius, 1, 80);
        scribble(this.hero.x - radius, this.hero.y + radius, radius * 2, this.visualHeight - (this.hero.y + radius), 1, 80);
    }
}

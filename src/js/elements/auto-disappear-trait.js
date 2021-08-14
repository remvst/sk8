class AutoDisappearTrait extends Trait {
    get key() {
        return 'auto-disappear'
    }

    cycle(elapsed) {
        if (!between(0, this.x, this.panel.visualWidth) || !between(0, this.y, this.panel.visualHeight)) {
            this.element.remove();
        }
    }
}

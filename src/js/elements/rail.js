class Rail extends Element {

    constructor(points) {
        super();

        this.points = points;

        for (let i = 0 ; i < points.length ; i++) {
            const current = points[i];
            const nextPoint = points[i+1];

            // Link to next
            if (nextPoint) {
                this.renderables.push(new Segment(current, nextPoint, '#fff', 8));
            }

            // Link to ground
            this.renderables.push(new Segment(
                current,
                point(current.x, current.y, 0),
                '#fff', 8
            ));
        }
    }

    transformed(transform) {
        return new Rail(this.points.map(transform));
    }

    updateRenderables() {
        const hero = this.world.hero;

        let collides = false;
        if (hero && hero.input.userControlled && !hero.grinding) {
            const collision = this.collides(hero, RAIL_GRIND_PADDING);
            collides = collision && collision.positionOnRail.z <= hero.z;
        }

        this.renderables.forEach(renderable => {
            renderable.color = collides ? '#0f0' : '#fff';
        });
    }

    collides(hero, padding) {
        let res = null;

        for (let i = 0 ; i < this.points.length - 1 ; i++) {
            const current = this.points[i];
            const nextPoint = this.points[i+1];
            const distance = dist(current, nextPoint);
            const distanceToHero = dist(current, hero);

            const relativePosition = this.relativePosition(current, nextPoint, hero);

            const relativeProgress = relativePosition.x / distance;

            if (
                between(-padding, relativePosition.x, distance + padding) &&
                between(-padding, relativePosition.y, padding)
                // TODO add z check for collision
            ) {
                res = {
                    'positionOnRail': point().set(
                        relativeProgress * (nextPoint.x - current.x) + current.x,
                        relativeProgress * (nextPoint.y - current.y) + current.y,
                        relativeProgress * (nextPoint.z - current.z) + current.z,
                    ),
                    'grindingAngle': angleBetween(current, nextPoint),
                };

                if (between(0, relativePosition.x, distance)) {
                    break;
                }
            }
        }
        return res;
    }

    relativePosition(p1, p2, pos) { // TODO dupe
        const angle = angleBetween(p1, p2);

        const pt = point(pos.x, pos.y, pos.z);
        pt.x -= p1.x;
        pt.y -= p1.y;
        pt.z -= p1.z;

        const rotated = point();
        rotated.x = pt.x * cos(angle) + pt.y * sin(angle);
        rotated.y = -pt.x * sin(angle) + pt.y * cos(angle);

        return rotated;
    }
}

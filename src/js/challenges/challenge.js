class Challenge {
    constructor(label) {
        this.label = label;
    }

    check(hero, lastCombo) {

    }

    wasCompleted() {
        return !!localStorage[nomangle('ch') + this.label];
    }

    markComplete() {
        localStorage[nomangle('ch') + this.label] = true;
    }
}

class TrickChallenge extends Challenge {
    check(hero, lastCombo) {
        return lastCombo.asString.indexOf(this.label) >= 0;
    }
}

class ComboValueChallenge extends Challenge {
    constructor(targetValue) {
        super(numberWithCommas(targetValue) + nomangle('PT COMBO'));
        this.targetValue = targetValue;
    }

    check(hero, lastCombo) {
        return lastCombo.total >= this.targetValue;
    }
}

class ComboSizeChallenge extends Challenge {
    constructor(targetCount) {
        super(targetCount + nomangle('X COMBO'));
        this.targetCount = targetCount;
    }

    check(hero, lastCombo) {
        return lastCombo.total >= this.targetCount;
    }
}

class ScoreChallenge extends Challenge {
    constructor(targetScore) {
        super(numberWithCommas(targetScore) + 'PT SCORE');
        this.targetScore = targetScore;
    }

    check(hero) {
        return hero.scene.score >= this.targetScore;
    }
}

CHALLENGES = [
    new ScoreChallenge(10000),
    new ScoreChallenge(100000),
    new ScoreChallenge(200000),

    new ComboValueChallenge(10000),
    new ComboValueChallenge(50000),
    new ComboValueChallenge(100000),

    new ComboSizeChallenge(5),
    new ComboSizeChallenge(15),
    new ComboSizeChallenge(25),

    new TrickChallenge(nomangle('RAIL TO RAIL')),
    new TrickChallenge(nomangle('360 ')),
    new TrickChallenge(nomangle('540 FLIPPITY')),
    new TrickChallenge(nomangle('DOUBLE FLIPPITY')),
    new TrickChallenge(nomangle('TRIPLE FLIPPITY')),
    new TrickChallenge(nomangle('QUADRUPLE FLIPPITY')),
    new TrickChallenge(nomangle('540 DOUBLE FLIPPITY')),
];

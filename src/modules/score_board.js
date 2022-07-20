const SCORE_SIZE = 32;

export class ScoreBoard {
	constructor() {
		this.score = 0;
		this.resize(1);
		this.update();
	}

	toJSON() { return { score: this.score }; }
	restore(data) { this.score = data.score; this.update(); }

	init() { this.score = 0; this.update(); }
	add(v) { this.score += v; this.update(); }

	resize(ratio) { document.getElementById('score').style.fontSize = `${SCORE_SIZE * ratio}px`; }
	update() { document.getElementById('score').textContent = `得点: ${this.score}`; }
}
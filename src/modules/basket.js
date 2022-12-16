const INITIAL_NUMBER_OF_BALLS = 10;
const BALL_W = 32;
const BALL_H = 32;

export class Basket {
	constructor() {
		this.restOfBalls = INITIAL_NUMBER_OF_BALLS;
		this.ballWidth = BALL_W;
		this.ballHeight = BALL_H;
	}

	toJSON() { return { restOfBalls: this.restOfBalls }; }

	get initValue() { return { restOfBalls: INITIAL_NUMBER_OF_BALLS }; }

	init(ratio, restoreData = undefined) {
		if (restoreData)
			this.restOfBalls = restoreData.restOfBalls;
		else
			this.restOfBalls = INITIAL_NUMBER_OF_BALLS;
		if (ratio !== undefined) {
			this.ballWidth = BALL_W * ratio;
			this.ballHeight = BALL_H * ratio;
		}

		const e = document.getElementById('basket');
		const isPortrait = e.parentElement.clientWidth > e.parentElement.clientHeight;
		e.textContent = '';
		e.style.width = isPortrait ? 'auto' : `${Math.ceil(this.ballWidth * 5)}px`;
		e.style.height = isPortrait ? `${this.ballHeight}px` : 'auto';
		this.addAnime(this.restOfBalls);
	}

	resize(ratio) {
		this.ballWidth = BALL_W * ratio;
		this.ballHeight = BALL_H * ratio;

		const e = document.getElementById('basket');
		const isPortrait = e.parentElement.clientWidth > e.parentElement.clientHeight;
		e.style.width = isPortrait ? 'auto' : `${Math.ceil(this.ballWidth * 5)}px`;
		e.style.height = isPortrait ? `${this.ballHeight}px` : 'auto';
		for (let i = 0; i < e.childNodes.length; ++i) {
			const ball = e.childNodes[i];
			ball.style.width = `${this.ballWidth}px`;
			ball.style.height = `${this.ballHeight}px`;
		}
	}

	add(value) {
		value = Math.abs(value);
		this.restOfBalls += value;
		this.addAnime(value);
	}

	remove(value) {
		value = Math.abs(value);
		if (value > this.restOfBalls)
			return false;
		const prevRest = this.restOfBalls;
		this.restOfBalls -= value;
		const e = document.getElementById('basket');
		for (let i = prevRest - 1; i >= this.restOfBalls; --i)
			e.childNodes[i].classList.add('eliminate');
		return true;
	}

	addAnime(value, prevBall) {
		if (prevBall)
			prevBall.classList.remove('brightly');
		if (value <= 0)
			return;
		const e = document.getElementById('basket');
		let lastBall = !e.childNodes.length ? null : e.childNodes[this.restOfBalls - value];
		if (!lastBall || !lastBall.classList.contains('eliminate')) {
			const ball = document.createElement('span');
			ball.className = 'ball brightly';
			ball.style.width = `${this.ballWidth}px`;
			ball.style.height = `${this.ballHeight}px`;
			document.getElementById('basket').appendChild(ball);
			lastBall = ball;
		} else {
			lastBall.classList.remove('eliminate');
			lastBall.classList.add('brightly');
			lastBall.style.width = `${this.ballWidth}px`;
			lastBall.style.height = `${this.ballHeight}px`;
		}
		requestAnimationFrame(this.addAnime.bind(this, value - 1, lastBall));
	}
}
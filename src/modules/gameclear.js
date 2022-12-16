const WIDTH = 400;
const HEIGHT = 146;

export class GameClear {
	constructor() {
		const e = document.getElementById('message');
		const child = document.createElement('img');
		child.className = 'character';
		child.src = `images/gameclear.png`;
		e.appendChild(child);
		this.beginTime = 0;
		this.maxWidth = WIDTH;
		this.maxHeight = HEIGHT;
	}

	init() {
		const base = document.getElementById('base');
		const cw = base.clientWidth;
		const top = base.clientHeight / 2 - this.maxHeight / 2;
		const height = this.maxHeight;
		const e = document.getElementById('message');
		const child = e.childNodes[0];
		child.dataset.x = cw / 2 * this.maxWidth + this.maxWidth / 2;
		child.style.left = `${child.dataset.x}px`;
		child.style.top = `${top}px`;
		child.style.width = '0px';
		child.style.height = `${height}px`;
		e.style.display = 'block';
		requestAnimationFrame(this.update.bind(this));
	}

	clear() {
		const e = document.getElementById('message');
		e.style.display = 'none';
	}

	update(elapsedTime) {
		if (!this.beginTime)
			this.beginTime = elapsedTime;

		const e = document.getElementById('message');
		const progressTime = elapsedTime - this.beginTime;
		const child = e.childNodes[0];
		const begin = progressTime;
		if (begin >= 0) {
			const w = begin < 1000 ? (begin / 1000) * this.maxWidth : this.maxWidth;
			const x = child.dataset.x | 0;
			child.style.left = `${x - w / 2}px`;
			child.style.width = `${w}px`;
		}
		if (progressTime < 1900)
			requestAnimationFrame(this.update.bind(this));
	}

	resize(ratio) {
		this.ratio = ratio;
		this.maxWidth = WIDTH * ratio;
		this.maxHeight = HEIGHT * ratio;

		const progressTime = performance.now() - this.beginTime;
		const base = document.getElementById('base');
		const cw = base.clientWidth;
		const top = base.clientHeight / 2 - this.maxHeight / 2;
		const height = this.maxHeight;
		const e = document.getElementById('message');
		const child = e.childNodes[0];
		const begin = progressTime;
		if (begin >= 0) {
			child.dataset.x = cw / 2 * this.maxWidth + this.maxWidth / 2;
			const w = begin < 1000 ? (begin / 1000) * this.maxWidth : this.maxWidth;
			const x = child.dataset.x | 0;
			child.style.left = `${x - w / 2}px`;
			child.style.top = `${top}px`;
			child.style.width = `${w}px`;
			child.style.height = `${height}px`;
		}
	}
}
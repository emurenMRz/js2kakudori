const WIDTH = 160;
const HEIGHT = 160;

export class GameOver {
	constructor() {
		const e = document.getElementById('message');
		for (let i = 0; i < 4; ++i) {
			const child = document.createElement('img');
			child.className = 'character';
			child.src = `images/gameover${i + 1}.png`;
			e.appendChild(child);
		}
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
		for (let i = 0; i < e.childNodes.length; ++i) {
			const child = e.childNodes[i];
			child.dataset.x = cw / 2 + (i - 2) * this.maxWidth + this.maxWidth / 2;
			child.style.left = `${child.dataset.x}px`;
			child.style.top = `${top}px`;
			child.style.width = '0px';
			child.style.height = `${height}px`;
		}
		e.style.display = 'block';
		this.beginTime = Date.now();
		setTimeout(() => this.update(), 16);
	}

	clear() {
		const e = document.getElementById('message');
		e.style.display = 'none';
	}

	update() {
		const e = document.getElementById('message');
		const progressTime = Date.now() - this.beginTime;
		for (let i = 0; i < e.childNodes.length; ++i) {
			const child = e.childNodes[i];
			const begin = progressTime - i * 300;
			if (begin >= 0) {
				const w = begin < 1000 ? (begin / 1000) * this.maxWidth : this.maxWidth;
				const x = child.dataset.x | 0;
				child.style.left = `${x - w / 2}px`;
				child.style.width = `${w}px`;
			}
		}
		if (progressTime < 1900)
			setTimeout(() => this.update(), 16);
	}

	resize(ratio) {
		this.ratio = ratio;
		this.maxWidth = WIDTH * ratio;
		this.maxHeight = HEIGHT * ratio;

		const progressTime = Date.now() - this.beginTime;
		const base = document.getElementById('base');
		const cw = base.clientWidth;
		const top = base.clientHeight / 2 - this.maxHeight / 2;
		const height = this.maxHeight;
		const e = document.getElementById('message');
		for (let i = 0; i < e.childNodes.length; ++i) {
			const child = e.childNodes[i];
			const begin = progressTime - i * 300;
			if (begin >= 0) {
				child.dataset.x = cw / 2 + (i - 2) * this.maxWidth + this.maxWidth / 2;
				const w = begin < 1000 ? (begin / 1000) * this.maxWidth : this.maxWidth;
				const x = child.dataset.x | 0;
				child.style.left = `${x - w / 2}px`;
				child.style.top = `${top}px`;
				child.style.width = `${w}px`;
				child.style.height = `${height}px`;
			}
		}
	}
}
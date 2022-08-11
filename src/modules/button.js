const BUTTON_W = 160;
const BUTTON_H = 92;
const COST_SIZE = 32;

export class Button {
	constructor(id, ratio, cost, click) {
		this.id = id;

		const e = document.getElementById(this.id);
		e.className = 'button';
		e.style.backgroundImage = `url("images/${this.id}.png")`;
		if (click)
			e.addEventListener('click', click);
		if (cost) {
			const costFrame = document.createElement('span');
			costFrame.className = 'cost-frame';
			costFrame.textContent = cost;
			e.appendChild(costFrame);
		}

		this.resize(ratio);
	}

	resize(ratio) {
		const button = document.getElementById(this.id);
		button.style.width = `${BUTTON_W * ratio}px`;
		button.style.height = `${BUTTON_H * ratio}px`;
		if (button.hasChildNodes())
			button.childNodes[0].style.fontSize = `${COST_SIZE * ratio}px`;
	}

	enable(state) {
		const e = document.getElementById(this.id);
		state ? e.classList.remove('disable') : e.classList.add('disable');
	}
}

export class SwapButton {
	#width = 160;
	#height = 64;

	constructor(id, ratio, click) {
		this.id = id;

		const e = document.getElementById(this.id);
		e.style.backgroundImage = `url("images/swap.png")`;
		e.addEventListener('click', click);

		this.resize(ratio);
	}

	resize(ratio) {
		const button = document.getElementById(this.id);
		button.style.width = `${this.#width * ratio}px`;
		button.style.height = `${this.#height * ratio}px`;
	}
}

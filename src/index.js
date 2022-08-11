import { Grid, GRID_MAX_X, GRID_MAX_Y } from './modules/grid.js';
import { ConnectLine } from './modules/connect_line.js';
import { Button, SwapButton } from './modules/button.js';
import { GameOver } from './modules/gameover.js';
import { ScoreBoard } from './modules/score_board.js';
import { Basket } from './modules/basket.js';

(function () {
	const HINT_COST = 1;
	const SHUFFLE_COST = 5;

	let pixelRatio = 1.0;
	let TILE_W = 64;
	let TILE_H = 86;
	let TILE_FULL_W = 64;
	let TILE_FULL_H = 104;
	let LINE_WIDTH = 24;
	let FLOAT_HEIGHT = 16;
	let cx, cy;

	const GamePhase = { INIT: 0, MAIN: 1, GAMEOVER: 2, GAMECLEAR: 3, AUTO: 4 };
	let gamePhase = GamePhase.INIT;
	let bonusScore = 0;
	let layout = 'L-status';
	let inPickUp = false;

	const grid = new Grid();
	const connectLine = new ConnectLine();
	const buttons = [];
	const gameOver = new GameOver();
	const scoreBoard = new ScoreBoard();
	const basket = new Basket();

	function calcClientRatio(width, height) {
		const wr = width / 1280;
		const hr = height / 800;
		return wr < hr ? wr : hr;
	}

	function adjustmentSize(width, height) {
		pixelRatio = calcClientRatio(width, height);
		TILE_W = 64 * pixelRatio;
		TILE_H = 86 * pixelRatio;
		TILE_FULL_W = 64 * pixelRatio;
		TILE_FULL_H = 104 * pixelRatio;
		LINE_WIDTH = 24.0 * pixelRatio;
		FLOAT_HEIGHT = 16 * pixelRatio;
		cx = (width / 2 - TILE_W * GRID_MAX_X / 2);
		cy = (height / 2 - TILE_H * GRID_MAX_Y / 2);
		return pixelRatio;
	}

	function getGridId(x, y) { return `grid${x}-${y}`; }
	function getGridElement(x, y) { return document.getElementById(getGridId(x, y)); }

	class SelectedTile {
		constructor() {
			this.selectedTile = null;
		}

		get isEmpty() { return this.selectedTile == null; }
		get gridId() { return this.selectedTile.id; }
		get tileType() { return this.selectedTile.dataset.tileType; }
		get gridX() { return this.selectedTile.dataset.gx | 0; }
		get gridY() { return this.selectedTile.dataset.gy | 0; }

		detach() {
			const tile = this.selectedTile;
			this.selectedTile = null;
			return tile;
		}

		set(tile) {
			connectLine.clear();
			const prevTile = this.selectedTile;
			if (prevTile)
				prevTile.style.top = `${((prevTile.dataset.gy | 0) - 2) * TILE_H + cy}px`;
			tile.style.top = `${((tile.dataset.gy | 0) - 2) * TILE_H + cy - FLOAT_HEIGHT}px`;
			this.selectedTile = tile;
		}

		clear() {
			connectLine.clear();
			const tile = this.selectedTile;
			if (tile)
				tile.style.top = `${((tile.dataset.gy | 0) - 2) * TILE_H + cy}px`;
			this.selectedTile = null;
		}
	}
	const selectedTile = new SelectedTile();

	function updateButtonState() {
		buttons[1].enable(basket.restOfBalls >= HINT_COST);
		buttons[2].enable(basket.restOfBalls >= SHUFFLE_COST);
	}

	//=====  =====//

	const check = (function () {
		const weight_grid = new Array(GRID_MAX_Y + 4);
		for (let y = 0; y < weight_grid.length; ++y)
			weight_grid[y] = new Array(GRID_MAX_X + 4);
		const dx = [0, +1, 0, -1];
		const dy = [-1, 0, +1, 0];

		const checkLine = (x, y, d, fp) => {
			for (; ;) {
				x += dx[d];
				y += dy[d];
				if (weight_grid[y][x])
					break;
				if (fp)
					weight_grid[y][x] = 1;
			}
			return weight_grid[y][x] > 0 ? [[x, y]] : null;
		};

		const checkCross = (x, y, d) => {
			for (; ;) {
				x += dx[d];
				y += dy[d];
				if (weight_grid[y][x])
					break;
				weight_grid[y][x] = 1;

				let wd = (d + 1) % 4;
				let rs = checkLine(x, y, wd, false);
				if (rs)
					return rs.concat([[x, y]]);

				wd = (wd + 2) % 4;
				rs = checkLine(x, y, wd, false);
				if (rs)
					return rs.concat([[x, y]]);
			}
			return weight_grid[y][x] > 0 ? [[x, y]] : null;
		};

		return function (x1, y1, x2, y2) {
			for (let y = 0; y < weight_grid.length; ++y)
				for (let x = 0; x < weight_grid[y].length; ++x)
					weight_grid[y][x] = grid.isEmpty(x, y) ? 0 : -1;
			weight_grid[y1][x1] = 1;
			weight_grid[y2][x2] = 1;

			const line = [[x1, y1]];
			let rs = null;

			if ((rs = checkLine(x1, y1, 0, true)) != null ||
				(rs = checkLine(x1, y1, 1, true)) != null ||
				(rs = checkLine(x1, y1, 2, true)) != null ||
				(rs = checkLine(x1, y1, 3, true)) != null)
				return line.concat(rs);

			const dx = x2 - x1;
			const dy = y2 - y1;
			let n1, n2, n3, n4;
			if (Math.abs(dx) >= Math.abs(dy)) {
				if (dx >= 0) n1 = 3, n4 = 1; else n1 = 1, n4 = 3;
				if (dy >= 0) n2 = 0, n3 = 2; else n2 = 2, n3 = 0;
			} else {
				if (dy >= 0) n1 = 0, n4 = 2; else n1 = 2, n4 = 0;
				if (dx >= 0) n2 = 3, n3 = 1; else n2 = 1, n3 = 3;
			}

			if ((rs = checkCross(x2, y2, n1)) != null ||
				(rs = checkCross(x2, y2, n2)) != null ||
				(rs = checkCross(x2, y2, n3)) != null ||
				(rs = checkCross(x2, y2, n4)) != null)
				return line.concat(rs).concat([[x2, y2]]);

			return null;
		}
	})();

	function search() {
		for (let y = 2; y < GRID_MAX_Y + 2; ++y)
			for (let x = 2; x < GRID_MAX_X + 2; ++x) {
				const find = grid.findSimilarTiles(x, y);
				if (!find)
					continue;
				for (let i = 0; i < find.length; ++i) {
					const line = check(x, y, find[i].x, find[i].y);
					if (line)
						return { pair: [{ x, y }, find[i]], line };
				}
			}
		return null;
	}

	function listOfCanTakenTiles(map) {
		const canTaken = [];
		let noPair = false;
		for (const type in map) {
			const m = map[type];
			for (let i = 0; i < m.length - 1; ++i)
				for (let j = i + 1; j < m.length; ++j) {
					const line = check(m[i].x, m[i].y, m[j].x, m[j].y);
					if (line)
						canTaken.push({ pair: [m[i], m[j]], line });
					else
						noPair = true;
				}
		}
		return { canTaken, canAllTaken: !noPair };
	}

	function checkRestOfTile() {
		const map = grid.tileMap();
		let numberOfRemaining = 0;
		for (const type in map)
			numberOfRemaining += map[type].length;

		if (!numberOfRemaining) {
			gamePhase = GamePhase.GAMECLEAR;
			resetGame();
			return;
		}

		const pairs = listOfCanTakenTiles(map);
		if (!pairs.canTaken.length) {
			const find = search();
			if (find)
				alert('checkRestOfTile: tile remains.');
			gamePhase = GamePhase.GAMEOVER;
			gameOver.init();
		}
		else if (pairs.canAllTaken) {
			gamePhase = GamePhase.AUTO;
			++bonusScore;
			scoreBoard.add(bonusScore);
			pickUp(pairs.canTaken[0]);
		}
	}

	//=====  =====//
	function pickUp(target) {
		if (!target || inPickUp) return;
		inPickUp = true;
		const pair = target.pair;
		const line = target.line;
		const s = getGridElement(pair[0].x - 2, pair[0].y - 2), d = getGridElement(pair[1].x - 2, pair[1].y - 2);
		s.style.top = `${((s.dataset.gy | 0) - 2) * TILE_H + cy - FLOAT_HEIGHT}px`;
		d.style.top = `${((d.dataset.gy | 0) - 2) * TILE_H + cy - FLOAT_HEIGHT}px`;
		connectLine.draw(line);
		setTimeout(() => deleteTile(s, d, FLOAT_HEIGHT), 16);
	}

	function resetGame(restoreData = undefined) {
		selectedTile.clear();
		grid.init(restoreData?.grid);
		for (let y = 0; y < GRID_MAX_Y; ++y)
			for (let x = 0; x < GRID_MAX_X; ++x) {
				const child = getGridElement(x, y);
				if (!child)
					continue;
				child.dataset.tileType = grid.getTileId(x, y);
				child.style.top = `${y * TILE_H + cy}px`;
				child.style.display = 'inline';
				child.style.opacity = 1;
				child.style.backgroundImage = `url("${grid.tileImage(x, y)}")`;
			}
		basket.add(bonusScore);
		updateButtonState();
		bonusScore = 0;
		gamePhase = restoreData?.gamePhase !== undefined ? restoreData.gamePhase : GamePhase.MAIN;
	}

	function shuffleBoard() {
		selectedTile.clear();
		grid.shuffle();
		for (let y = 0; y < GRID_MAX_Y; ++y)
			for (let x = 0; x < GRID_MAX_X; ++x) {
				const child = getGridElement(x, y);
				if (!child)
					continue;
				child.dataset.tileType = grid.getTileId(x, y);
				child.style.top = `${y * TILE_H + cy}px`;
				child.style.opacity = 1;
				child.style.backgroundImage = `url("${grid.tileImage(x, y)}")`;
			}
	}

	function deleteTile(s, d, c) {
		if (c > 0) {
			let delta = FLOAT_HEIGHT - c;
			delta *= delta;
			delta += FLOAT_HEIGHT;
			const alpha = e => {
				const gy = e.dataset.gy | 0;
				e.style.top = `${(gy - 2) * TILE_H + cy - delta}px`;
				e.style.opacity = c / FLOAT_HEIGHT;
			};
			alpha(s);
			alpha(d);
			--c;
			setTimeout(() => deleteTile(s, d, c), 16);
			return;
		}

		const clearGrid = e => {
			grid.setEmpty(e.dataset.gx, e.dataset.gy);
			e.dataset.tileType = -1;
			e.style.display = 'none';
		};
		clearGrid(s);
		clearGrid(d);

		inPickUp = false;
		connectLine.clear();
		checkRestOfTile();
	}

	function doReset() {
		gameOver.clear();
		scoreBoard.init();
		basket.init();
		resetGame();
	}

	function doHint() {
		if (!basket.remove(HINT_COST))
			return;
		updateButtonState();
		const list = listOfCanTakenTiles(grid.tileMap());
		for (let i = 0; i < list.canTaken.length; ++i) {
			const pair = list.canTaken[i].pair;
			getGridElement(pair[0].x - 2, pair[0].y - 2).classList.add('hint');
			getGridElement(pair[1].x - 2, pair[1].y - 2).classList.add('hint');
		}
		selectedTile.clear();
	}

	function doShuffle() {
		if (!basket.remove(SHUFFLE_COST))
			return;
		updateButtonState();
		gameOver.clear();
		shuffleBoard();
		gamePhase = GamePhase.MAIN;
	}

	function doSwapLayout() {
		const basicLayout = document.getElementById('basic-layout');
		if (basicLayout.classList.contains('L-status')) {
			basicLayout.classList.replace('L-status', 'R-status');
			layout = 'R-status';
		} else {
			basicLayout.classList.replace('R-status', 'L-status');
			layout = 'L-status';
		}
	}

	addEventListener('load', () => {
		const restoreValue = (key, defaultValue) => {
			const v = localStorage.getItem(key);
			return v !== null ? JSON.parse(v) : defaultValue;
		};

		const restoreData = {
			gamePhase: restoreValue('gamePhase', GamePhase.MAIN),
			bonusScore: restoreValue('bonusScore', 0),
			grid: restoreValue('grid', undefined),
			scoreBoard: restoreValue('scoreBoard', scoreBoard.initValue),
			basket: restoreValue('basket', basket.initValue),
			layout: restoreValue('layout', 'L-status'),
		};
		localStorage.clear();

		bonusScore = restoreData.bonusScore;
		layout = restoreData.layout;
		scoreBoard.restore(restoreData.scoreBoard);

		const base = document.getElementById('base');
		const buttonRatio = calcClientRatio(base.clientWidth, base.clientHeight);

		document.getElementById('control-box').style.padding = `${96 * buttonRatio}px 0 ${48 * buttonRatio}px`;

		scoreBoard.resize(buttonRatio);
		buttons.push(new Button('reset', buttonRatio, 0, doReset));
		buttons.push(new Button('hint', buttonRatio, HINT_COST, doHint));
		buttons.push(new Button('shuffle', buttonRatio, SHUFFLE_COST, doShuffle));
		buttons.push(new SwapButton('swap', buttonRatio, doSwapLayout));
		basket.init(buttonRatio, restoreData.basket);
		gameOver.resize(buttonRatio);

		const basicLayout = document.getElementById('basic-layout');
		basicLayout.classList.add(layout);

		const mat = document.getElementById('mat');
		const cw = mat.clientWidth;
		const ch = mat.clientHeight;
		adjustmentSize(cw, ch);
		connectLine.init(cw, ch, cx, cy, TILE_W, TILE_H, LINE_WIDTH);

		const clickTile = function () {
			if (gamePhase != GamePhase.MAIN || this.dataset.tileType == -1)
				return;
			if (selectedTile.isEmpty)
				selectedTile.set(this);
			else if (this.id == selectedTile.gridId)
				selectedTile.clear();
			else if (this.dataset.tileType === selectedTile.tileType) {
				const line = check(selectedTile.gridX, selectedTile.gridY, this.dataset.gx | 0, this.dataset.gy | 0);
				if (line) {
					const s = selectedTile.detach(), d = this;
					d.style.top = `${((d.dataset.gy | 0) - 2) * TILE_H + cy - FLOAT_HEIGHT}px`;
					scoreBoard.add(1);
					connectLine.draw(line);
					setTimeout(() => deleteTile(s, d, FLOAT_HEIGHT), 16);
					for (let y = 0; y < GRID_MAX_Y; ++y)
						for (let x = 0; x < GRID_MAX_X; ++x)
							getGridElement(x, y).classList.remove('hint');
				}
			}
			else
				selectedTile.set(this);
		};

		const connect = document.getElementById('connect');
		for (let y = 0; y < GRID_MAX_Y; ++y)
			for (let x = 0; x < GRID_MAX_X; ++x) {
				const child = document.createElement('div');
				child.id = getGridId(x, y);
				child.className = 'tile';
				child.dataset.gx = x + 2;
				child.dataset.gy = y + 2;
				child.dataset.tileType = -1;
				child.style.width = `${TILE_FULL_W}px`;
				child.style.height = `${TILE_FULL_H}px`;
				child.style.left = `${x * TILE_W + cx}px`;
				child.style.top = `${y * TILE_H + cy}px`;
				child.style.backgroundImage = `url("${grid.tileImage(0)}")`;
				child.onclick = clickTile;
				mat.insertBefore(child, connect);
			}

		resetGame(restoreData);
		if (gamePhase == GamePhase.GAMEOVER)
			gameOver.init();
	});

	addEventListener('resize', () => {
		const base = document.getElementById('base');
		const ratio = calcClientRatio(base.clientWidth, base.clientHeight);

		document.getElementById('control-box').style.padding = `${96 * ratio}px 0 ${48 * ratio}px`;

		scoreBoard.resize(ratio);
		for (let i = 0; i < buttons.length; ++i)
			buttons[i].resize(ratio);
		basket.resize(ratio);
		gameOver.resize(ratio);

		const mat = document.getElementById('mat');
		const cw = mat.clientWidth;
		const ch = mat.clientHeight;
		adjustmentSize(cw, ch);
		connectLine.init(cw, ch, cx, cy, TILE_W, TILE_H, LINE_WIDTH);
		selectedTile.clear();

		for (let y = 0; y < GRID_MAX_Y; ++y)
			for (let x = 0; x < GRID_MAX_X; ++x) {
				const child = getGridElement(x, y);
				child.style.width = `${TILE_FULL_W}px`;
				child.style.height = `${TILE_FULL_H}px`;
				child.style.left = `${x * TILE_W + cx}px`;
				child.style.top = `${y * TILE_H + cy}px`;
			}
	});

	addEventListener('keydown', e => {
		if (e.key == 'c' && gamePhase == GamePhase.MAIN) {
			console.log('[chart] auto take.');
			pickUp(search());
		}
	});

	addEventListener('unload', () => {
		localStorage.setItem('gamePhase', JSON.stringify(gamePhase));
		localStorage.setItem('bonusScore', JSON.stringify(bonusScore));
		localStorage.setItem('grid', JSON.stringify(grid));
		localStorage.setItem('scoreBoard', JSON.stringify(scoreBoard));
		localStorage.setItem('basket', JSON.stringify(basket));
		localStorage.setItem('layout', JSON.stringify(layout));
	});
})();
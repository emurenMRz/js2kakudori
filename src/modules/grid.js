export const GRID_MAX_X = 17;
export const GRID_MAX_Y = 8;

const TERMINATOR = -2;
const EMPTY = -1;
const TILE_TYPE_MAX = 3 * 9 + 7;

export class Grid {
	constructor() {
		const grid = new Array(GRID_MAX_Y + 4);
		for (let y = 0; y < grid.length; ++y) {
			grid[y] = new Array(GRID_MAX_X + 4);
			for (let x = 0; x < grid[y].length; ++x)
				grid[y][x] = TERMINATOR;
		}
		this.grid = grid;
	}

	toJSON() { return { grid: this.grid }; }

	isEmpty(x, y) { return this.grid[y][x] == EMPTY; }
	setEmpty(x, y) { return this.grid[y][x] = EMPTY; }
	getTileId(x, y) { return this.grid[y + 2][x + 2]; }

	init(restoreData = undefined) {
		if (restoreData && restoreData.grid !== undefined)
			this.grid = restoreData.grid;
		else {
			for (let y = 1; y < GRID_MAX_Y + 3; ++y)
				for (let x = 1; x < GRID_MAX_X + 3; ++x)
					this.grid[y][x] = EMPTY;

			for (let q = 0; q < 4; ++q)
				for (let tileType = 0; tileType < TILE_TYPE_MAX; ++tileType) {
					let x, y;
					do {
						x = (Math.random() * GRID_MAX_X + 2) | 0;
						y = (Math.random() * GRID_MAX_Y + 2) | 0;
					}
					while (this.grid[y][x] != -1);
					this.grid[y][x] = tileType;
				}
		}
	}

	findSimilarTiles(x, y) {
		const tileType = this.grid[y][x];
		if (tileType == -1)
			return null;
		const find = [];
		for (let gy = 2; gy < GRID_MAX_Y + 2; ++gy)
			for (let gx = 2; gx < GRID_MAX_X + 2; ++gx)
				if (!(gx == x && gy == y) && this.grid[gy][gx] == tileType)
					find.push({ x: gx, y: gy });
		return find;
	}

	shuffle() {
		for (let y = 2; y < GRID_MAX_Y + 2; ++y)
			for (let x = 2; x < GRID_MAX_X + 2; ++x)
				if (this.grid[y][x] >= 0) {
					let dx, dy;
					do {
						dx = (Math.random() * GRID_MAX_X + 2) | 0;
						dy = (Math.random() * GRID_MAX_Y + 2) | 0;
					}
					while (this.grid[dy][dx] < 0 || dx == x && dy == y);
					const w = this.grid[y][x];
					this.grid[y][x] = this.grid[dy][dx];
					this.grid[dy][dx] = w;
				}
	}

	tileRemains() {
		for (let y = 2; y < GRID_MAX_Y + 2; ++y)
			for (let x = 2; x < GRID_MAX_X + 2; ++x)
				if (this.grid[y][x] >= 0)
					return true;
		return false;
	}

	tileMap() {
		const map = {};
		for (let y = 2; y < GRID_MAX_Y + 2; ++y)
			for (let x = 2; x < GRID_MAX_X + 2; ++x) {
				const type = this.grid[y][x];
				if (type >= 0)
					if (!map[type])
						map[type] = [{ x, y }];
					else
						map[type].push({ x, y });
			}
		return map;
	}

	tileImage(x, y) {
		const id = y === undefined ? x : this.grid[y + 2][x + 2];
		const type = "mpsj"[(id / 9) | 0];
		const no = (id % 9 + 1) | 0;
		return 'images/tile/' + type + no + '.png';
	}
}

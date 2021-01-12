export class ConnectLine {
	constructor() {
		this.context = null;
		this.centerX = 0;
		this.centerY = 0;
		this.gridWidth = 0;
		this.gridHeight = 0;
	}

	init(w, h, centerX, centerY, gridWidth, gridHeight, lineWidth) {
		const connect = document.getElementById('connect');
		if (!connect || !connect.getContext)
			return;
		connect.width = w | 0;
		connect.height = h | 0;
		this.context = connect.getContext('2d');
		this.context.strokeStyle = 'rgba(0, 255, 0, 0.5)';
		this.context.lineWidth = lineWidth;
		this.centerX = centerX;
		this.centerY = centerY;
		this.gridWidth = gridWidth;
		this.gridHeight = gridHeight;
	}

	clear() {
		document.getElementById('connect').style.display = 'none';
		const ctx = this.context;
		if (ctx)
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	}

	draw(pt) {
		const ctx = this.context;
		if (!ctx)
			return;
		const cx = this.centerX;
		const cy = this.centerY;
		const gw = this.gridWidth;
		const gh = this.gridHeight;
		ctx.beginPath();
		ctx.moveTo((pt[0][0] - 2) * gw + cx + gw / 2, (pt[0][1] - 2) * gh + cy + gh / 2);
		for (let i = 1; i < pt.length; ++i)
			ctx.lineTo((pt[i][0] - 2) * gw + cx + gw / 2, (pt[i][1] - 2) * gh + cy + gh / 2);
		ctx.stroke();
		document.getElementById('connect').style.display = 'block';
	}
}

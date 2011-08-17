define(function() {

	function Plotter() {

	}

	Plotter.prototype.plotPath = function(ctx, x, y, coords, xVal, yVal) {
		var maxX,
			maxY,
			minX,
			minY,
			maxXY,
			mult,
			cenX,
			cenY;
		
		for (var i = 0; i < coords.length; i++) {
			maxX = (maxX == undefined)? coords[i][xVal] : Math.max(maxX, coords[i][xVal]);
			maxY = (maxY == undefined)? coords[i][yVal] : Math.max(maxY, coords[i][yVal]);
			minX = (minX == undefined)? coords[i][xVal] : Math.min(minX, coords[i][xVal]);
			minY = (minY == undefined)? coords[i][yVal] : Math.min(minY, coords[i][yVal]);
		}
		
		maxXY = Math.max(maxX - minX, maxY - minY);
		mult = 300.0 / maxXY;
		cenX = (300.0 - ((maxX - minX) * mult)) / 2;
		cenY = (300.0 - ((maxY - minY) * mult)) / 2;
		
		for (var i = 0; i < coords.length; i++) {
			var px = Math.round(x + cenX + ((coords[i][xVal] - minX) * mult));
			var py = Math.round(y + cenY + ((coords[i][yVal] - minY) * mult));
			if (i == 0) {
				ctx.moveTo(px, py);
			}
			else {
				ctx.lineTo(px, py);
			}
		}
	}

	return new Plotter();
});
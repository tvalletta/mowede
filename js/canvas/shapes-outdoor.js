define(function() {

	function ShapesOutdoor() {

	}

	ShapesOutdoor.prototype.makeCloud = function(ctx) {
		ctx.beginPath();
		ctx.lineJoin = 'round';
		ctx.moveTo(100, 100);
		ctx.lineTo(200, 100);
		ctx.bezierCurveTo(235, 100, 220, 65, 195, 76);
		ctx.bezierCurveTo(230, 44, 145, 10, 150, 60);
		ctx.bezierCurveTo(146, 54, 137, 56, 135, 63);
		ctx.bezierCurveTo(140, 34, 85, 50, 110, 75);
		ctx.bezierCurveTo(85, 50, 60, 100, 100, 100);

		var grad = ctx.createLinearGradient(0,60,0,200);
		grad.addColorStop(0, '#fff');
		grad.addColorStop(1, '#00ABEB');

		ctx.lineWidth = 6;
		ctx.fillStyle = grad;
		ctx.fill();
		ctx.strokeStyle = "#fff";
		ctx.stroke();
	}
	
	ShapesOutdoor.prototype.makeGrass = function(ctx) {
		ctx.beginPath();
		ctx.lineJoin = 'miter';
		ctx.miterLimit = 99;
		
		ctx.moveTo(46, 400);
		ctx.bezierCurveTo(50, 389, 50, 395, 47, 385);
		ctx.bezierCurveTo(54, 389, 54, 395, 54, 400);
		
		ctx.bezierCurveTo(54, 394, 54, 384, 60, 378);
		ctx.bezierCurveTo(57, 394, 59, 384, 62, 400);
		
		ctx.bezierCurveTo(62, 396, 62, 392, 66, 388);
		ctx.bezierCurveTo(64, 396, 66, 394, 70, 400);

		var grad = ctx.createLinearGradient(0,375,0,400);
		grad.addColorStop(0, '#1a8000');
		grad.addColorStop(1, '#26C000');

		ctx.lineWidth = 3;
		ctx.strokeStyle = grad;
		ctx.stroke();
	}
	
	return new ShapesOutdoor();
});
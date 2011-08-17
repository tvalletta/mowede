define(
	[
		'lib/i18n!nls/text',
		'lib/reqwest',
		'canvas/shapes',
		'canvas/plotter'
	], 
	function(
		I18n,
		xhr,
		Shapes,
		Plotter
	) {

	function Menu() {

	}

	Menu.prototype.draw = function(ctx) {
		this.drawBackground(ctx);
		this.drawButton(ctx);
		xhr({
			url: '/json/driveHome.json',
			type: 'json',
			method: 'get',
			success: function (data) {
				Plotter.plotPath(ctx, 10, 100, data, 'lon', 'lat');
			    ctx.lineWidth = 3;
				ctx.strokeStyle = '#fff';
				ctx.stroke();				
			},
			error: function (err) { }
		});
	}

	Menu.prototype.animate = function(ctx) {
		
	}

	Menu.prototype.stop = function(ctx) {
		
	}

	// Draw Componenents ------------------------------------------------------

	Menu.prototype.drawBackground = function(ctx) {
		// var bg = ctx.createLinearGradient(0,0,0,460);
		// bg.addColorStop(0, '#26C000');
		// bg.addColorStop(1, '#9dddf9');

		ctx.fillStyle = '#26C000';
		ctx.fillRect(0,0,320,460);
	}

	Menu.prototype.drawButton = function(ctx) {
		Shapes.roundedRect(ctx, 120, 50, 95, 20, 10);

		var grad = ctx.createLinearGradient(90, 20, 90, 70);
		grad.addColorStop(0, '#1a8000');
		grad.addColorStop(1, '#26C000');

		ctx.save();
	    ctx.shadowColor = "#000";
	    ctx.shadowBlur = 12;
	    ctx.shadowOffsetX = 0;
	    ctx.shadowOffsetY = 0;
		ctx.fill();
		ctx.restore();
		
		ctx.fillStyle = '#26C000';
		ctx.fill();
		
	    ctx.lineWidth = 5;
		ctx.strokeStyle = '#fff';
		ctx.stroke();
	}

	return Menu;
});
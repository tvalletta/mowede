define(
	[
		'lib/i18n!nls/text',
		'lib/reqwest',
		'canvas/shapes',
		'canvas/shapes-outdoor',
		'canvas/plotter',
		'geoloc/geoloc',
		'math/mathematics',
		'browser/position'
	], 
	function(
		I18n,
		xhr,
		Shapes,
		ShapesOutdoor,
		Plotter,
		GeoLoc,
		Mathematics,
		Position
	) {

	function Menu(main) {
		this.main = main;
		this.tours = {};
		for (var i = 0; i < localStorage.length; i++) {
			var key = localStorage.key(i);
			if (main.loc) {
				var data = JSON.parse(localStorage.getItem(key));
				var distance = Math.round(GeoLoc.haversineDistance(
						main.loc.coords.latitude,
						main.loc.coords.longitude,
						data[0].lat,
						data[0].lon,
						GeoLoc.units.ft));
			}
			this.tours[key] = (main.loc)? distance : 0;
		}
	}

	Menu.prototype.drawBasic = function(ctx) {
		this.drawBackground(ctx, true);
		this.drawHeader(ctx, true);
		this.drawListBox(ctx, true);
		this.drawButton(ctx, true);
	}

	Menu.prototype.draw = function(ctx) {
		this.drawBackground(ctx);
		this.drawHeader(ctx);
		this.drawListBox(ctx);
		this.drawButton(ctx);
				
		ctx.save();
		ctx.translate(70, -418);
		ctx.scale(2, 2);
		ShapesOutdoor.makeGrass(ctx);
		ctx.fillStyle = '#26C000';
		ctx.fill()
		ctx.restore();
		
		// Plot path ------------------
		// xhr({
		// 	url: '/json/driveHome.json',
		// 	type: 'json',
		// 	method: 'get',
		// 	success: function (data) {
		// 		Plotter.plotPath(ctx, 10, 100, data, 'lon', 'lat');
		// 	    ctx.lineWidth = 3;
		// 		ctx.strokeStyle = '#fff';
		// 		ctx.stroke();				
		// 	},
		// 	error: function (err) { }
		// });
	}

	Menu.prototype.animate = function(ctx) {
		this.drawListValues(ctx, this.tours);
		this.addEventHandlers();
	}

	Menu.prototype.stop = function(ctx) {
		
	}

	// Event Handling ---------------------------------------------------------
	
	Menu.prototype.addEventHandlers = function() {
		var thiz = this;
		this.main.canvas.addEventListener('click', function(evt) {
			var ePos = Position.event(evt);
			var cPos = {
				x: thiz.main.canvas.offsetLeft,
				y: thiz.main.canvas.offsetTop
			}
			alert((ePos.x - cPos.x) + ", " + (ePos.y - cPos.y));
		});
	}

	// Draw Componenents ------------------------------------------------------

	Menu.prototype.drawHeader = function(ctx, basic) {
		ctx.save();
		
		if (!basic) {
		    ctx.shadowColor = "#000";
		    ctx.shadowBlur = 9;
		    ctx.shadowOffsetX = 0;
		    ctx.shadowOffsetY = 0;
		}
		
		ctx.fillStyle = '#fff';
		ctx.font = "bold 30pt Arial";
		ctx.fillText('Tours', 97, 75);

		ctx.restore();
	}

	Menu.prototype.drawBackground = function(ctx) {
		ctx.fillStyle = '#26C000';
		ctx.fillRect(0,0,320,460);
	}

	Menu.prototype.drawButton = function(ctx, basic) {
		Shapes.roundedRect(ctx, 120, 50, 30, 385, 10);

		ctx.save();
		if (!basic) {
		    ctx.shadowColor = "#000";
		    ctx.shadowBlur = 12;
		    ctx.shadowOffsetX = 0;
		    ctx.shadowOffsetY = 0;
		}
		ctx.fillStyle = '#00ABEB';
		ctx.fill();
		ctx.restore();
	
		ctx.save();
	    ctx.lineWidth = 5;
		ctx.strokeStyle = '#fff';
		ctx.stroke();
		ctx.restore();
		
		ctx.fillStyle = '#fff';
		ctx.font = "20pt Arial";
		ctx.fillText('Record', 47, 419);
	}

	Menu.prototype.drawListBox = function(ctx, basic) {
		Shapes.roundedRect(ctx, 260, 260, 30, 100, 10);

		ctx.save();
		if (!basic) {
		    ctx.shadowColor = "#000";
		    ctx.shadowBlur = 12;
		    ctx.shadowOffsetX = 0;
		    ctx.shadowOffsetY = 0;
		}
		ctx.fillStyle = '#00ABEB';
		ctx.fill();
		ctx.restore();
		
		ctx.save();
	    ctx.lineWidth = 5;
		ctx.strokeStyle = '#fff';
		ctx.stroke();
		ctx.restore();
	}

	Menu.prototype.drawListValues = function(ctx, values) {
		ctx.save();
		ctx.fillStyle = '#fff';
		ctx.font = "18pt Arial";
		var cnt = 0;
		for (var i in values) {
			var dist = " ";
			if (values[i]) {
				if (values[i] > 52800) {
					dist += "- " + Math.round(values[i] / 5280) + "mi";
				}
				else if (values[i] > 5280) {
					dist += "- " + Mathematics.round(values[i] / 5280, 1) + "mi";
				}
				else if (values[i] > 100) {
					dist += "- " + Math.round(values[i] / 3) + "yd";
				}
				else {
					dist += "- " + Math.round(values[i]) + "ft"
				}
			}
			var text = i + dist;
			ctx.fillText(text, 44, 134 + (34 * cnt++));
		}
		ctx.restore();
	}

	return Menu;
});
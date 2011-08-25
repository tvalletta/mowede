define(function() {
	function Slider(scene1, scene2) {
		this.scene1 = scene1;
		this.scene2 = scene2;
	}
	
	Slider.prototype.slide = function(ctx, callback) {
		var scene1 = this.scene1,
			draw1 = ((scene1.drawBasic)? 'drawBasic' : 'draw'),
			scene2 = this.scene2,
			draw2 = ((scene2.drawBasic)? 'drawBasic' : 'draw'),
			effect = this.easeInOut,
			step = 1;
		scene1.stop();
		var interval = setInterval(function() {
			var pos = effect(0, 460, 30, step++, 2.5);
			
			if (step <= 30) {
				ctx.save();
				ctx.translate(0, 0 - pos);
				scene1[draw1](ctx);
				ctx.restore();
			
				ctx.save();
				ctx.translate(0, 460 - pos);
				scene2[draw2](ctx);
				ctx.restore();
			}
			else {
				ctx.save();
				ctx.translate(0, 460 - pos);
				scene2.draw(ctx);
				ctx.restore();
			}	
					
			if (step > 30) {
				clearInterval(interval);
				if (callback) callback();
			}
		}, 40);
	}

	Slider.prototype.easeInOut = function(min, max, steps, step, powr) {
	    var delta = max - min; 
	    var pos = min + ( Math.pow( ( ( 1 / steps ) * step ), powr ) * delta ); 
	    return Math.ceil(pos) 
	}

	return Slider;
});
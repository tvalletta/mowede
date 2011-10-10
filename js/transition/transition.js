define(function() {
	function Transition(main, scene1, scene2) {
		this.main = main;
		this.scene1 = scene1;
		this.scene2 = scene2;
	}
	
	Transition.prototype.slideUp = function(callback) {
		this.main.canvas.height = 920;
		var ctx = this.main.ctx = this.main.canvas.getContext('2d');
		
		this.scene1.stop();	
		this.scene1.draw(ctx);

		ctx.save();
		ctx.translate(0, 460);
		this.scene2.draw(ctx);
		ctx.restore();
		
		this.main.canvas.className = 'slideUp';
		
		var thiz = this;
		setTimeout(function() {
			var newCanvas = document.createElement('canvas');
			newCanvas.setAttribute('id', 'canvas');
			newCanvas.height = 460;
			newCanvas.width = 320;
			
			thiz.main.base.removeChild(thiz.main.canvas);
			thiz.main.base.appendChild(newCanvas);
			thiz.main.canvas = newCanvas;
			thiz.main.ctx = thiz.main.canvas.getContext('2d');
			
			thiz.scene2.draw();
			if (callback) callback();
		}, 1000);
	}

	return Transition;
});
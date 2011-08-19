define(function() {

	function Mowede(canvas) {
		var thiz = this;
		this.canvas = canvas;
		this.speed = 1;

        //grass animation properties
        this.maxGrassDisplacement = 2;
        this.lastUpdate = Date.now();
        this.lastRadialPosition = 0;
	
		this.canvas.addEventListener('click', function(evt) {
			location.href = '#/menu';
		});
				
		var touch = 0;
		this.canvas.addEventListener("touchstart", function(evt) {
			setTimeout(function() {touch = 0;}, 1200);
			if (touch++ >= 4) {
				location.href = '#/menu'
			} 
		});
		
		this.canvas.addEventListener("touchmove", function(evt) {
			evt.preventDefault();
			evt.stopPropagation();
		});

		this.canvas.addEventListener('gesturestart', function(evt) {
			canvas.addEventListener('gesturechange', gestureChange);
			canvas.addEventListener('gestureend', gestureEnd);
		});



        window.ondevicemotion = function(e){
            if(e.accelerationIncludingGravity.x > 5){
                console.log(e.accelerationIncludingGravity.x);
//                thiz.makeRain();
                alert("here");
            }
        }


		function gestureStart(evt) {
			canvas.addEventListener('gesturechange', gestureChange);
			canvas.addEventListener('gestureend', gestureEnd);
		}
	
		function gestureChange(evt) {
			thiz.speed += evt.scale;
			if (evt.rotation < 0) {
				if (thiz.speed > 0) {
					thiz.speed *= -1;
				}
			}
			else {
				if (thiz.speed < 0) {
					thiz.speed *= -1;
				}
			}
		}
	
		function gestureEnd(evt) {
			canvas.removeEventListener('gesturechange', gestureChange);
			canvas.removeEventListener('gestureend', gestureEnd);
		}
	}
		
	Mowede.prototype.draw = function(ctx) {
		this.makeSky(ctx);

		this.makeBackdrop(ctx);
		this.makeGrass(ctx);
		
		ctx.save();
		ctx.translate(250, -60);
		ctx.scale(-1.25, 1.25);
		this.makeGrass(ctx, true);
		ctx.restore();
		
		this.makeBanner(ctx);
		this.makeM(ctx);
		
		ctx.save();
		ctx.translate(canvas.width, canvas.height);
		ctx.rotate(Math.PI);
		
		this.makeM(ctx);

		ctx.restore();
	}

	Mowede.prototype.animate = function(ctx) {
		var thiz = this;
		this.move1 = -80; 
		this.move2 = 0;

		this.interval = setInterval(function() {
			thiz.makeSky(ctx);

			ctx.save();
			ctx.translate(200 + Math.floor(thiz.move1 += (thiz.speed * .15)), 0);
			ctx.scale(-.75, .75);
			thiz.makeCloud(ctx);
			ctx.restore();

			ctx.save();
			ctx.translate(Math.floor(thiz.move2 += (thiz.speed * .3)), 0);
			thiz.makeCloud(ctx);
			ctx.restore();

            // Animate Grass
            ctx.save();
            ctx.fillStyle = "#26C000";
            ctx.fillRect(0,360,320,100);
            thiz.makeGrass(ctx, true);
            ctx.restore();

            ctx.save();
            ctx.translate(240, -60);
            ctx.scale(-1.25, 1.25);
            thiz.makeGrass(ctx);
            ctx.restore();

			if (thiz.move1 >= 300) thiz.move1 -= 600;
			if (thiz.move2 >= 300) thiz.move2 -= 600;
			if (thiz.move1 <= -300) thiz.move1 += 600;
			if (thiz.move2 <= -300) thiz.move2 += 600;
		}, 30);
	}

	Mowede.prototype.stop = function() {
		clearInterval(this.interval);
	}
	
	// Draw Components --------------------------------------------------------

	Mowede.prototype.makeSky = function(ctx) {
		var sky = ctx.createLinearGradient(0,0,0,105);
		sky.addColorStop(0, '#00ABEB');
		sky.addColorStop(1, '#9bddf9');

		ctx.fillStyle = sky;
		ctx.fillRect(0,0,320,105);				
	}
	
	Mowede.prototype.makeBackdrop = function(ctx) {
		var backdrop = ctx.createLinearGradient(0,105,0,355);
		backdrop.addColorStop(0, '#9dddf9');
		backdrop.addColorStop(0.33, '#fff');
		backdrop.addColorStop(0.33, '#26C000');
		backdrop.addColorStop(1, '#26C000');
		
		ctx.fillStyle = backdrop;
		ctx.fillRect(0,105,320,355);
						
		//ctx.fillStyle = '#26C000';
		//ctx.fillRect(0,355,320,460);
	}

	// Clouds -------------------------------------------------------->
	
	Mowede.prototype.makeCloud = function(ctx) {
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

	Mowede.prototype.makeGrass = function(ctx, flipped) {
        // Calculate speed of grass movement, scale from the speed of the clouds with a max of 4
        var grassSpeed = this.speed == 1 ? 1 : Math.min(Math.abs(this.speed * .55), 4);

        // Calculate change in time since last animation update
        var now = Date.now();
        var elapsed = now - this.lastUpdate;
        this.lastUpdate = now;

        // Calculate the change in radial position based on elapsed time
        var radialChange = (grassSpeed * elapsed) / 1000;   // radial change per second
        this.lastRadialPosition = (this.lastRadialPosition + radialChange) % (2*Math.PI);   // store last radial position

        // Calculate x displacement using a sinusoidal effect
        var moveX = Math.sin(this.lastRadialPosition) * this.maxGrassDisplacement;

        // Check to see if this grass has been mirrored, if so flip x displacement
        moveX = flipped ? -moveX : moveX;

        //Draw grass
		ctx.beginPath();
		ctx.lineJoin = 'miter';
		ctx.miterLimit = 99;
		
		ctx.moveTo(46, 400);
		ctx.bezierCurveTo(50, 389, 50, 395, 47+moveX, 385);
		ctx.bezierCurveTo(54, 389, 54, 395, 54, 400);
		
		ctx.bezierCurveTo(54, 394, 54, 384, 60+moveX, 378);
		ctx.bezierCurveTo(57, 394, 59, 384, 62, 400);
		
		ctx.bezierCurveTo(62, 396, 62, 392, 66+moveX, 388);
		ctx.bezierCurveTo(64, 396, 66, 394, 70, 400);

		var grad = ctx.createLinearGradient(0,375,0,400);
		grad.addColorStop(0, '#1a8000');
		grad.addColorStop(1, '#26C000');

		ctx.lineWidth = 3;
		ctx.strokeStyle = grad;
		ctx.stroke();
	}

    /*
    Mowede.prototype.makeRain = function(ctx){
    }
    */



	Mowede.prototype.makeBanner = function(ctx) {
		var rectW = 240;
	    var rectH = 240;
	    var rectX = 40;
	    var rectY = 110;
		
	    var cornerRadius = 25;

		var aX = rectX + cornerRadius;
		var aY = rectY;
		var bX = rectX + rectW - cornerRadius;
		var bY = rectY;
		
		var cX = rectX + rectW;
		var cY = rectY + cornerRadius;
		var dX = rectX + rectW;
		var dY = rectY + rectH - cornerRadius;
		
		var eX = rectX + rectW - cornerRadius;
		var eY = rectY + rectH;
		var fX = rectX + cornerRadius;
		var fY = rectY + rectH;
		
		var gX = rectX;
		var gY = rectY + rectH - cornerRadius;
		var hX = rectX;
		var hY = rectY + cornerRadius;

		var trX = rectX + rectW;
		var trY = rectY;
		var brX = rectX + rectW;
		var brY = rectY + rectH;
		var blX = rectX;
		var blY = rectY + rectH;
		var tlX = rectX;
		var tlY = rectY; 

	    ctx.beginPath();
	    ctx.moveTo(aX, aY);
	    ctx.lineTo(bX, bY);
	    ctx.arcTo(trX, trY, cX, cY, cornerRadius);
	    ctx.lineTo(dX, dY);
	    ctx.arcTo(brX, brY, eX, eY, cornerRadius);
	    ctx.lineTo(fX, fY);
	    ctx.arcTo(blX, blY, gX, gY, cornerRadius);
	    ctx.lineTo(hX, hY);
	    ctx.arcTo(tlX, tlY, aX, aY, cornerRadius);

		var grad = ctx.createLinearGradient(0,rectX,0,rectX + rectH);
		grad.addColorStop(0, '#26C000');
		grad.addColorStop(1, '#1a8000');

		ctx.closePath();
	    ctx.lineWidth = 5;
		ctx.fillStyle = grad;
		ctx.fill();
		ctx.strokeStyle = '#fff';
	    ctx.stroke();
	}
		
	Mowede.prototype.makeM = function(ctx) {
		var charX = 68;
		var charY = 135;
		var charH = 140;
		var charW = 147;
		var rad = charW / 4;
		
		var tlX = charX;
		var tlY = charY;
		var blX = charX;
		var blY = charY + charH;
		var bmX = charX + (rad * 1 * 2);
		var bmY = charY + charH;
		var brX = charX + (rad * 2 * 2);
		var brY = charY + charH;
		
		var hs1X = charX;
		var hs1Y = charY + (rad * 1.5);
		var hs2X = charX + (rad * 1 * 2);
		var hs2Y = charY + (rad * 1.5);
		var hs3X = charX + (rad * 2 * 2);
		var hs3Y = charY + (rad * 1.5);
		
		var hb1X = charX;
		var hb1Y = charY;
		var hb2X = charX + (rad * 1 * 2);
		var hb2Y = charY;
		var hb3X = charX + (rad * 2 * 2);
		var hb3Y = charY;
		
		var h1X = charX + rad;
		var h1Y = charY;
		
		ctx.beginPath();
		ctx.lineJoin = 'round';
		ctx.moveTo(tlX, tlY);
		// ctx.moveTo(hs1X, hs1Y);
		ctx.lineTo(blX, blY);
		ctx.moveTo(hs1X, hs1Y);
		ctx.bezierCurveTo(hb1X, hb1Y, hb2X, hb2Y, hs2X, hs2Y);
		ctx.lineTo(bmX, bmY);
		ctx.moveTo(hs2X, hs2Y);
		ctx.bezierCurveTo(hb2X, hb2Y, hb3X, hb3Y, hs3X, hs3Y);
		ctx.lineTo(brX, brY);
		
		ctx.lineCap = 'round';
	    ctx.lineWidth = 27;
		ctx.strokeStyle = '#fff';
	    ctx.stroke();
	}
	
	return Mowede;
});
define(function() {

	function Shapes() {

	}

	Shapes.prototype.roundedRect = function(ctx, width, height, x, y, radius) {
		var aX = x + radius,
		    aY = y,
		    bX = x + width - radius,
		    bY = y,
		    cX = x + width,
		    cY = y + radius,
		    dX = x + width,
		    dY = y + height - radius,
		    eX = x + width - radius,
		    eY = y + height,
		    fX = x + radius,
		    fY = y + height,
		    gX = x,
		    gY = y + height - radius,
		    hX = x,
		    hY = y + radius,
		    trX = x + width,
		    trY = y,
		    brX = x + width,
		    brY = y + height,
		    blX = x,
		    blY = y + height,
		    tlX = x,
		    tlY = y; 

	    ctx.beginPath();
	    ctx.moveTo(aX, aY);
	    ctx.lineTo(bX, bY);
	    ctx.arcTo(trX, trY, cX, cY, radius);
	    ctx.lineTo(dX, dY);
	    ctx.arcTo(brX, brY, eX, eY, radius);
	    ctx.lineTo(fX, fY);
	    ctx.arcTo(blX, blY, gX, gY, radius);
	    ctx.lineTo(hX, hY);
	    ctx.arcTo(tlX, tlY, aX, aY, radius);
		ctx.closePath();
	}

	return new Shapes();
});
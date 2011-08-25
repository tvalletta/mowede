define(function() {

	function Position() {

	}

	Position.prototype.event = function(e) {
		var pos = {};
		if (e.pageX || e.pageY) {
			pos.x = e.pageX;
			pos.y = e.pageY;
		}
		else {
			pos.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			pos.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		return pos;
	}

	return new Position();
});
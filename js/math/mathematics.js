define(function() {

	function Mathematics() {

	}

	Mathematics.prototype.round = function(n, plc) {
		return Math.round(n * Math.pow(10, plc)) / Math.pow(10, plc);
	}

	return new Mathematics();
});
define(function() {

	function Url(target) {

	}

	Url.prototype.param = function(key, def) {
		def = (def)? def : ""; 
		key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
		var qs = regex.exec(window.location.href);
		return (qs == null)? def : qs[1];
	}
	
	return new Url();
});
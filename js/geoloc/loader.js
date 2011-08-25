define(
	[
		'lib/reqwest'
	],
	function(
		Xhr
	) {

	function Loader(name, file) {
		this.name = name;
		this.file = file;
	}

	Loader.prototype.load = function() {
		var thiz = this;
		Xhr({
			url: 'json/' + thiz.file + '.json',
			type: 'json',
			method: 'get',
			success: function (data) {
				localStorage.setItem(thiz.name, JSON.stringify(data));
				alert('Loaded: ' + thiz.name);
			},
			error: function (err) { 
				alert('Unable to load: ' + thiz.file);
			}
		});
	}
	
	return Loader;
});
require(
	[
		'lib/i18n!nls/text',
		'lib/reqwest',
		'mowede/mowede',
		'menu/menu',
		'geoloc/geoloc',
		'slider/slider',
		'lib/SS'
	],
	function(I18n, xhr, Mowede, Menu, Geoloc, Slider){

		// --- Initialization -------------------------------------------------

        var base = document.getElementById('base'),
			canvas = document.getElementById('canvas'),
			scene = null;
			
		if (canvas.getContext) {
			var ctx = canvas.getContext('2d');
		}
		
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function() {/* Do nothing */});
		}
		
		// --- Router ---------------------------------------------------------

		var router = new Router({
			'/mowede': {
				on: doMowede
			},
			'/menu': {
				on: doMenu
			},
			'/geoloc': {
				on: doGeoloc
			}
		}).use({
			notfound: function(value) { 
				this.setRoute('/mowede');
			}
		});
		router.init();

		// --- Page Setup -----------------------------------------------------
		
		function doMowede() {
			var mowede = new Mowede(canvas);
			transitionTo(mowede);
		}
		
		function doGeoloc() {
			var geoloc = new Geoloc(base);
			geoloc.go();
		}
		
		function doMenu() {
			var menu = new Menu();
			transitionTo(menu);
		}
		
		// --- Page Transition ------------------------------------------------
		
		function transitionTo(newScene) {
			if (scene) {
				var slider = new Slider(scene, newScene);
				slider.slide(ctx);
			}
			else {
				newScene.draw(ctx);
			}
			if (newScene.animate) newScene.animate(ctx);
			scene = newScene;
		} 
	}
);
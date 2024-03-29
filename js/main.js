require(
	[
		'lib/i18n!nls/text',
		'lib/reqwest',
		'mowede/mowede',
		'menu/menu',
		'geoloc/geoloc',
		'geoloc/loader',
		'transition/transition',
		'lib/SS'
	],
	function(I18n, xhr, Mowede, Menu, Geoloc, Loader, Transition){

		// --- Initialization -------------------------------------------------

        var main = {
			base: document.getElementById('base'),
			canvas: document.getElementById('canvas'),
			ctx: null,
			history: [],
			scene: null
		};
			
		main.ctx = main.canvas.getContext('2d');
		
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(pos) {
				main.loc = pos;
			});
		}
		
		attachEventHandlers();
		
		// --- Router ---------------------------------------------------------

		var router = new Router({
			'/mowede': {
				on: doMowede
			},
			'/menu': {
				on: doMenu
			},
			'/load/(\\w+)/(\\w+)': {
				on: doLoad
			},
			'/geoloc': {
				on: doGeoloc
			}
		}).use({
			on: function(value) {
				main.history.push(value);
			},
			notfound: function(value) { 
				this.setRoute('/mowede');
			}
		}).init();

		// --- Page Setup -----------------------------------------------------
		
		function doMowede() {
			var mowede = new Mowede(main);
			transitionTo(mowede);
		}
		
		function doMenu() {
			var menu = new Menu(main);
			transitionTo(menu);
		}
		
		function doLoad(name, path) {
			var loader = new Loader(name, path);
			loader.load();
		}
		
		function doGeoloc() {
			var geoloc = new Geoloc(main);
			geoloc.record();
		}
		
		// --- Page Transition ------------------------------------------------
		
		function transitionTo(newScene) {
			if (main.scene) {
				if (main.scene.stop) main.scene.stop();
				var transition = new Transition(main, main.scene, newScene);
				transition.slideUp(function() {
					if (newScene.animate) newScene.animate();
				});
			}
			else {
				newScene.draw();
				if (newScene.animate) newScene.animate();
			}
			main.scene = newScene;
		} 
		
		// --- Shake to go back -----------------------------------------------
		
		function attachEventHandlers() {
			main.shakeSemaphore = 0;
	        window.ondevicemotion = function(e){
	            if (e.accelerationIncludingGravity.x > 5){
					if (main.history.length) {
						if (main.shakeSemaphore++ === 0) {
							for (var x in main.history) {
								console.log(x + "|" + main.history[x]);
							}
			                router.setRoute(main.history.pop);
							setTimeout(function() {main.shakeSemaphore = 0}, 600);
						}
					}
	            }
	        }
		}
	}
);
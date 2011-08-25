define(function() {

	function Geoloc(main) {
		this.main = main;
		this.units = {
			km: 6371.009,
			kilometers: 6371.009,
			m: 6371009,
			meters: 6371009,
			mi: 3958.761,
			miles: 3958.761,
			yd: 6967420.17,
			yards: 6967420.17,
			ft: 20902260.5,
			feet: 20902260.5			
		}
	}

	Geoloc.prototype.init = function(target) {
		this.target = target;
		
		this.last = null;
		target.removeChild(target.firstChild);
	}

	Geoloc.prototype.record = function() {
		var thiz = this;
		var target = this.target;
		var last = this.last;
		
		var positionWatchHandler = function(pos) {
			var lon1 = pos.coords.longitude;
			var lat1 = pos.coords.latitude;
			if (last) {
		 		var lon2 = last.coords.longitude;
				var lat2 = last.coords.latitude;
				var d = thiz.haversineDistance(lat1, lon1, lat2, lon2, thiz.units.ft);
			}
			else {
				var d = 0;
			}		

			last = pos;

			var divE = document.createElement('div');
			divE.setAttribute('class', 'coord');
			divE.innerHTML = "Lat:" + pos.coords.latitude + " Lon:" + pos.coords.longitude + " Dist:" + d + "ft";
			target.appendChild(divE);
		}

		navigator.geolocation.watchPosition(positionWatchHandler);
	}
	
	Geoloc.prototype.toRadians = function(degrees) {
		return degrees * (Math.PI / 180);
	}
	
	Geoloc.prototype.toDegrees = function(radians) {
		return radians * (180 / Math.PI);
	}
	
	Geoloc.prototype.haversineDistance = function(lat1, lon1, lat2, lon2, units) {
		var R = units; // km
		var dLat = this.toRadians(lat2-lat1);
		var dLon = this.toRadians(lon2-lon1);
		var lat1 = this.toRadians(lat1);
		var lat2 = this.toRadians(lat2);

		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c;
		
		return d;
	}
	
	Geoloc.prototype.sphericalLawOfCosinesDistance = function(lat1, lon1, lat2, lon2, units) {
		lat1 = this.toRadians(lat1);
		lon1 = this.toRadians(lon1);
		lat2 = this.toRadians(lat2);
		lon2 = this.toRadians(lon2);
		
		var R = units;
		var d = Math.acos(Math.sin(lat1)*Math.sin(lat2) + 
		                  Math.cos(lat1)*Math.cos(lat2) *
		                  Math.cos(lon2-lon1)) * R;
		
		return d;
	}
	
	Geoloc.prototype.equirectangularApproximationDistance = function(lat1, lon1, lat2, lon2, units) {
		lat1 = this.toRadians(lat1);
		lon1 = this.toRadians(lon1);
		lat2 = this.toRadians(lat2);
		lon2 = this.toRadians(lon2);
		
		var R = units;
		var x = (lon2-lon1) * Math.cos((lat1+lat2)/2);
		var y = (lat2-lat1);
		var d = Math.sqrt(x*x + y*y) * R;
		
		return d;
	}
	
	return new Geoloc();
});
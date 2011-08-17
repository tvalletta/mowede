define(function() {

	function Geoloc(target) {
		this.target = target;
		this.last = null;
		target.innterHTML = '';
	}

	Geoloc.prototype.go = function() {
		var target = this.target;
		var last = this.last;
		
		var positionWatchHandler = function(pos) {
			var lon1 = pos.coords.longitude;
			var lat1 = pos.coords.latitude;
			if (last) {
		 		var lon2 = last.coords.longitude;
				var lat2 = last.coords.latitude;

				var R = 20902231; // Radius of the earth in feet
				var x = (lon2-lon1) * Math.cos((lat1+lat2)/2);
				var y = (lat2-lat1);
				var d = Math.sqrt(x*x + y*y) * R;
			}
			else {
				var d = "";
			}		

			last = pos;

			var divE = document.createElement('div');
			divE.setAttribute('class', 'coord');
			divE.innerHTML = "Lat:" + pos.coords.latitude + " Lon:" + pos.coords.longitude + " Dist:" + d;
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
	
	Geoloc.prototype.distance = function(lat1, lon1, lat2, lon2) {
		var R = 6371; // km (change this constant to get miles)
		var dLat = (lat2-lat1) * Math.PI / 180;
		var dLon = (lon2-lon1) * Math.PI / 180;
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
			Math.sin(dLon/2) * Math.sin(dLon/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c;
		if (d>1) return Math.round(d)+"km";
		else if (d<=1) return Math.round(d*1000)+"m";
		return d;
	}
	
	return Geoloc;
});
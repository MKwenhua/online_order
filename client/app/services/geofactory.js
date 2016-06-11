app.factory('GeoLocMethods', function(){
	return function(showPosition){
		function _showError(error) {
	    switch(error.code) {
	      case error.PERMISSION_DENIED:
	        console.log( "User denied the request for Geolocation.");
	        break;
	      case error.POSITION_UNAVAILABLE:
	        console.log("Location information is unavailable.");
	        break;
	      case error.TIMEOUT:
	        console.log("The request to get user location timed out.");
	        break;
	      case error.UNKNOWN_ERROR:
	        console.log("An unknown error occurred.");
	        break;
	  	  }
		};
		function noGeoLoc(){
			console.log("Fallback to something");
			return false;
		};
		var geoCoords = navigator.geolocation ? navigator.geolocation : noGeoLoc();
		
		return {
			getLocation: function() {
				 if (geoCoords) 
				  geoCoords.getCurrentPosition(showPosition, _showError);
				
			}
		}  
	
	};
});
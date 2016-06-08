var app = angular.module('app', [
 'ui.router',
  nearby.name,
 	//status.name,
 	laundry.name,
	welcome.name
])
.config(['$locationProvider', function($locationProvider) {
	  $locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
}])
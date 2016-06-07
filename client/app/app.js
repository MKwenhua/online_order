var app = angular.module('app', [
 'ui.router',
 welcome.name
])
.config(['$locationProvider', function($locationProvider) {
	  $locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
}])
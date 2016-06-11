

var app = angular.module('app', [
 'ui.router',
 'lbServices',
 'nearby',
 	//status.name,
 	'menu',
 	'laundry',
	'welcome'
])
.config(['$locationProvider', function($locationProvider) {
	  $locationProvider.html5Mode(true);
}])

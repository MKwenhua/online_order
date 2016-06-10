

var app = angular.module('app', [
 'ui.router',
  'nearby',
 	//status.name,
 	'laundry',
	'welcome'
])
.config(['$locationProvider', function($locationProvider) {
	  $locationProvider.html5Mode(true);
}])

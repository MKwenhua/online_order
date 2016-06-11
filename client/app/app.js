var app = angular.module('app', [
 'ui.router',
 'lbServices',
 	//status.name,
 	//'menu',
 	'laundry',
	'welcome'
])
.config(['$locationProvider','$stateProvider', function($locationProvider, $stateProvider) {
	 $locationProvider.html5Mode(true);
}])

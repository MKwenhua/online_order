var status = angular.module('status', [])
   .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('status', {
        url: '/status',
        template: [
				'<section ng-controller="StatusController as statusCtrl" class="status">',
					'<div class="container">',
							'<h1>lost your socks!</h1>',
				  '</div>',
				'</section>'
     ].join(''),
     controller: 'StatusController'
  });
})
.controller('StatusController', function($scope) {
  var statusCtrl = this;
  statusCtrl.stat = "lost your socks!";
})
.directive('laundryStat', function() {
  return {
     template: '<h1>lost your socks!</h1>'
  };
}); 

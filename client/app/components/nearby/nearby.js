angular.module('nearby', [])
   .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('nearby', {
        url: '/nearby',
        template: [
				'<section ng-controller="NearbyController as nearbyCtrl" class="nearby">',
					'<div class="container">',
					'<ul>',
					 '<li  ng-repeat="b in nearbyCtrl.closeBy">',
							 '<laundry-nearby></laundry-nearby>',
						'</li>',
					'</ul>',
				  '</div>',
				'</section>'
     ].join(''),
     controller: 'NearbyController'
  });
})
.controller('NearbyController', function($scope) {
  var nearbyCtrl = this;
  nearbyCtrl.closeBy = nearbyHTML.dryCleaners;
  
})
.directive('laundryNearby', function () {
  return {
     template: nearbyHTML.mat
  };
}); 
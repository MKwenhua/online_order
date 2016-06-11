angular.module('welcome', [])
   .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider.state('welcome', { 
        url: '/',
        template: [
				'<section id="welcome" ng-controller="WelcomeController as initCtrl" ng-class="[initCtrl.set]">',
						'<div class="load-block">',
								'<div class="loader">Loading...</div>',
						'</div>',
						'<div class="container">',
					   '<div ng-show="initCtrl.startUp" class="col-md-offset-2 col-md-8 center-options">',
					    	 '<h3>Dry Cleaners Near You</h3>',
					     	 '<div class="geo-find" ng-click="initCtrl.findNearby()">Nearby</div>',
					   '</div>',
					   '<ul id="nearbyList" class="pretty-ul centered-ul">',
								 	'<drycleaners-nearby></drycleaners-nearby>',
					   '</ul>',
					  '</div>',  
				'</section>'
     ].join(''),
     controller: 'WelcomeController'
  }); 
})
.controller('WelcomeController', function(GeoLocMethods, Laundromats) {
  var initCtrl = this;
  initCtrl.set = 'setup';
  initCtrl.startUp = true;
  initCtrl.closeBy = [];
  initCtrl.findNearby = function(){
  	initCtrl.startUp = false;
  	initCtrl.set = 'processing';
  	initCtrl.geo.getLocation();
  };
  
  function latLngStr(position){
		 var latLng = String(position.coords.longitude) + ' , '  + String(position.coords.latitude);
		 initCtrl.set = ''
		 Laundromats.getNearby({ coordinates: latLng })
		  .$promise
		  .then(function(dta) { 
		  	initCtrl.set = 'result-list';
		  	console.log(dta); 
        initCtrl.closeBy = dta;
		  	
		  });
		 }

  initCtrl.geo = GeoLocMethods(latLngStr);
})
.directive('drycleanersNearby', function() {
  return {
     template: [
     '<li ng-repeat="b in initCtrl.closeBy">',
	     '<div class="img-container-inline">',
	     		'<img height="60" width="60" ng-src="{{ b.imgurl ? b.imgurl : dry_Icon.png }}">',
	     '</div>',
	     '<div class="info-inline">',	
	     		'<strong>{{b.name | uppercase}}</strong><br>',
	    		'<span>{{b.address}}</span><span>something</span>',
	    	'</div>',
    	'</li>'
		].join('')
  };
});
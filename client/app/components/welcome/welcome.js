angular.module('welcome', [])
   .config(function( $stateProvider, $urlRouterProvider) {
   	  //$locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/welcome');
      $stateProvider.state('welcome', { 
        url: '/welcome',
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
					   '<h4 ng-show="initCtrl.hasResults">Results</h4>',
					   '<ul id="nearbyList" class="pretty-ul centered-ul">',
								 	'<drycleaners-nearby></drycleaners-nearby>',
					   '</ul>',
					  '</div>',  
				'</section>'
     ].join(''),
     controller: 'WelcomeController'
  }); 
})
.controller('WelcomeController', function(GeoLocMethods, Laundromats,searchResults) {
  var initCtrl = this;
  initCtrl.set = 'setup';
  initCtrl.startUp = true;
  initCtrl.hasResults = false;
  initCtrl.closeBy = searchResults;
  initCtrl.getImage = function(url){
  	return url ? url : 'dry_icon.jpg';
  };
  initCtrl.findNearby = function(){
  	initCtrl.startUp = false;
  	initCtrl.set = 'processing';
  	initCtrl.geo.getLocation();
  };
  
  function latLngStr(position){
		 var latLng = String(position.coords.longitude) + ' , '  + String(position.coords.latitude);
		 Laundromats.getNearby({ coordinates: latLng })
		  .$promise
		  .then(function(dta) { 
		  	initCtrl.hasResults = dta.length > 0;
		  	initCtrl.set = 'result-list';
		  	console.log(dta); 
		  	initCtrl.closeBy.mapResults(dta);  	
		  });
		 }
		
  initCtrl.geo = GeoLocMethods(latLngStr);
})
.directive('drycleanersNearby', function() {
  return {
     template: [
     '<li ng-repeat="b in initCtrl.closeBy.lmats">',
     '<a ui-sref="laundromat({id: b.id})">',
	     '<div class="img-container-inline">',
	     		'<img  ng-src="{{initCtrl.getImage(b.imgurl)}}">',
	     '</div>',
	     '<div class="info-inline">',	
	     		'<strong>{{b.name | uppercase}}</strong><br>',
	    		'<span>{{b.address}}</span><span>{{b.phone}}</span>',
	    	'</div>',
	    	'</a>',
    	'</li>'
		].join('')
  };
});
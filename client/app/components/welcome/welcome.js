 angular.module('welcome', [])
   .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider.state('welcome', { 
        url: '/',
        template: [
				'<section ng-controller="WelcomeController as initCtrl" class="welcome">',
					'<div class="container">',
				   '<div class="col-md-offset-3 col-md-6 center-options">',
				     '<h3>Click Things</h3>',
				     '<a ui-sref="laundry" class="opts-butt for-pick-up" >Request Pick Up<span class="side-tag"><i class="fa fa-dropbox" ></i></span></a>',
				     '<a ui-sref="nearby" class="opts-butt  see-map" >Cleaners Near Me<span class="side-tag"><i class="fa fa-map-marker" ></i></span></a>',
				     '<a ui-sref="laundry" class="opts-butt  check-up">Check Status<span class="side-tag"><i class="fa fa-info-circle" ></i></span></a>',
				   	 '<taco-bell></taco-bell>',
				   '</div>',
				  '</div>',
				'</section>'
     ].join(''),
     controller: 'WelcomeController'
  });
})
.controller('WelcomeController', function() {
  var initCtrl = this;
  initCtrl.whatsup = "爆拉肚子";
})
.directive('tacoBell', function() {
  return {
     template: welcomeHTML.first
  };
});
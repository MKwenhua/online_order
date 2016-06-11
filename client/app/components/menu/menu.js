app.module('menu', [])
   .config(function($stateProvider, $urlRouterProvider) {
     // $locationProvider.html5Mode(true);
      $stateProvider.state('menu', { 
        url: '/menu', 
        template: [
				'<section ng-controller="MenuController as menuCtrl" class="menu">',
					'<div class="container">',
				   '<div class="col-md-offset-3 col-md-6 center-options">',
				     '<h3>Click Things</h3>',
				     '<a ui-sref="laundry" class="opts-butt for-pick-up" >Request Pick Up<span class="side-tag"><i class="fa fa-dropbox" ></i></span></a>',
				     '<a ui-sref="laundry" class="opts-butt  see-map" >Cleaners Near Me<span class="side-tag"><i class="fa fa-map-marker" ></i></span></a>',
				     '<a ui-sref="laundry" class="opts-butt  check-up">Check Status<span class="side-tag"><i class="fa fa-info-circle" ></i></span></a>',
				   	 '<bottom-nav></bottom-nav>',
				   '</div>',
				  '</div>',
				'</section>'
     ].join(''),
     controller: 'MenuController'
  });
})
.controller('MenuController', function($stateParams) {
  var menuCtrl = this;
  
})
.directive('bottomNav', function() {
  return {
     template: ''//welcomeHTML.first
  };
});
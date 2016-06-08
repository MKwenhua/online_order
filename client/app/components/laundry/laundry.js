var laundry = angular.module('laundry', [])
   .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('laundry', {
        url: '/laundry',
        template: [
				'<section ng-controller="LaundryController as laundryCtrl" class="laundry">',
					'<div class="container tap-ui">',
							'<div class="col-md-offset-2 col-md-8">',
								'<div class="row">',
							    '<div class="row-center-title row-margin-20">Input Items to be picked up</div>',
									    '<div class="clothes-item" ng-repeat="b in laundryCtrl.clothes">',
												'<laundry-pick></laundry-pick>',
									'</div>',
								'</div>',
								'<div class="row">',
										'<div class="row-center-title row-margin-20">Total of 30</div>',
										'<div class="btn btn-primary submit-form-butt">Comfirm</div>',
								'</div>',
							'</div>',
						'</div>',
				'</section>'
     ].join(''),
     controller: 'LaundryController'
  });
})
.controller('LaundryController', function($scope) {
  var laundryCtrl = this;
  laundryCtrl.clothes = clothesForm.clothesItems;
  laundryCtrl.qtySum = function(price, qty){
  	return  parseFloat(price) * parseInt(qty);
  };
})
.directive('laundryPick', function() {
  return {
     template: clothesForm.mat
  };
}); 
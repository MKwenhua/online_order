 angular.module('laundry', [])
   .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('laundry', {
        url: '/laundry',
        template: [
				'<section ng-controller="LaundryController as laundryCtrl" class="laundry">',
					'<div class="container tap-ui">',
							'<div class="col-md-offset-2 col-md-8">',
								'<div class="row box-wrap">',
							    '<div class="row-center-title row-margin-20">Input Items to be picked up</div>',
									  '<form ng-submit="laundryCtrl.getLaundryList()">',
									   	 '<div class="clothes-item" ng-repeat="b in laundryCtrl.clothes">',
													'<laundry-pick></laundry-pick>',
												'</div>',
										'<div class="row-center-title row-margin-20">Total of {{laundryCtrl.priceTag}}</div>',
										'<button type="submit" class="btn btn-primary submit-form-butt">Comfirm</button>',
										'</form>',
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
  laundryCtrl.priceTag = 0.0;
  laundryCtrl.laundry = {
  	socks: 0,
  	shirt: 0,
  	underwear: 0,
  	pants: 0,
  	fancyShirt: 0, 
  	suit: 0
  };
  function calcStuff(){

  };
  laundryCtrl.qtySum = function(price, qty, rfkey){
  	return  parseFloat(price) * parseInt(qty);
  };
  laundryCtrl.getLaundryList = function(){
      console.log('laundryCtrl.laundry',laundryCtrl.laundry);
  };
})
.directive('laundryPick', function() {
  return {
     template: clothesForm.mat
  };
}); 

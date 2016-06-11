 angular.module('laundry', [])
   .config(['$stateProvider',
   function( $stateProvider) {
      $stateProvider.state('laundromat', {
        url: '/laundry/:id',
        template: [
				'<section ng-controller="LaundryController as laundryCtrl" class="laundry">',
					'<div  ng-hide="laundryCtrl.hasData" class="load-block">',
								'<div class="loader">Loading...</div>',
						'</div>',
					'<div ng-show="laundryCtrl.hasData" class="container container-col ng-cloak">',
							'<div class="col-md-offset-1 col-md-10">',
								'<div id="businessName">',
										'<h2 >{{laundryCtrl.thisCompany.name}}</h2>',
								'</div>',
								'<div class="order-wrap">',
							    '<div class="row-center-title row-margin-20">Input Items to be picked up</div>',
									  '<form id="laundryList" ng-submit="laundryCtrl.getLaundryList()" >',
									   	'<div class="is-real" ng-click="laundryCtrl.tap($event)" >',
													'<laundry-pick></laundry-pick>',
											'</div>',
										'<div class="row-center-title row-margin-20">Total of {{laundryCtrl.total | currency:"£":2}}</div>',
										'<button type="submit" class="btn btn-primary submit-form-butt">Comfirm</button>',
										'</form>',
									'</div>',
							'</div>',
						'</div>',
				'</section>'
     ].join(''),
     controller: 'LaundryController'
  });
}])
.controller('LaundryController', function($stateParams,searchResults, Orders, Laundromats) {
	console.log('Orders', Orders.properties);
	console.log('$stateParams', $stateParams);
  var laundryCtrl = this;
  laundryCtrl.hasData = false;
  laundryCtrl.thisCompany = searchResults.idMatch[$stateParams.id];
  
  
  function innitRest(){
	  laundryCtrl.socks = 0;
	  laundryCtrl.shirts = 0;
	  laundryCtrl.underwear = 0;
	  laundryCtrl.pants = 0;
	  laundryCtrl.fancyshirts = 0;
	  laundryCtrl.suits = 0;
	  laundryCtrl.total = 0.0;
	  var priceList = _laundryTemplate.keylist.reduce(function(obj,itm){
				  						 obj[itm[0]] = laundryCtrl.thisCompany[itm[1]];
				  						 return obj;
										},{});
	  console.log('priceList',	priceList);
	  laundryCtrl.customer_comments = '';
	 
	   
	  var totalPrice = (function(){
	  	var laundryTypes = ['socks','shirts','underwear', 'pants', 'fancyshirts', 'suits'];
	   	return function(){
	   		return laundryTypes.reduce(function(total, key){
	   				total += (laundryCtrl[key] * priceList[key]);
	   				return total;
	   		},0);
	   }
	  })();
	  laundryCtrl.tap = function($event){
	  	
	  	var item = $event.target.dataset.tp;
	  	if(item){
	  		laundryCtrl[item] += 1;
	  		laundryCtrl.total =  totalPrice();
	  	}
	  };
	  laundryCtrl.qtySum = function(price, qty, rfkey){
	  	laundryCtrl.total =  totalPrice();
	  	return  parseFloat(price) * parseInt(qty);
	  };
	  laundryCtrl.getLaundryList = function(){
	      console.log('laundryCtrl.laundry',laundryCtrl.thisCompany);
	  };
 	};
  if(laundryCtrl.thisCompany){
  	innitRest();
  	laundryCtrl.hasData = true;
  }else{
	  Laundromats.findById({ 
	  	id: $stateParams.id 
	  }).$promise
	  	.then(function(data) {
	  		laundryCtrl.thisCompany = data;
	  		innitRest();
	  		laundryCtrl.hasData = true;
	     });
	 }
})
.directive('laundryPick', function() {
  return {
     template: _laundryTemplate.mat
  };
}); 

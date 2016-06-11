 angular.module('laundry', [])
   .config(['$stateProvider',
   function( $stateProvider) {
      $stateProvider.state('laundromat', {
        url: '/laundry/:id',
        template: [
				'<section id="laundryBlock" ng-controller="LaundryController as laundryCtrl" class="laundry">',
						'<div ng-hide="laundryCtrl.hasData" class="load-block">',
									'<div class="loader">Loading...</div>',
						 '</div>',
						 '<form id="laundryList" ng-submit="laundryCtrl.getLaundryList()" >',
							'<div id="mainForm" ng-show="laundryCtrl.hasData" class="container container-col ng-cloak">',
									'<div class="col-md-offset-1 col-md-10">',
										'<div id="businessName">',
											'<h2 >{{laundryCtrl.thisCompany.name}}</h2>',
										'</div>',
										'<div ng-show="laundryCtrl.setAt === \'p1\' " class="order-wrap">',
							    	'<div  class="row-center-title row-margin-20-8">Input Items to be picked up</div>',
									  	 	'<div class="is-real" ng-click="laundryCtrl.tap($event)" >',
														'<laundry-pick></laundry-pick>',
												'</div>',
												'<div class="row-center-title row-margin-20">Total of {{laundryCtrl.order.total | currency:"£":2}}</div>',
												'<button ng-click="laundryCtrl.setAt = \'p2\' " class="btn btn-primary submit-form-butt">Comfirm</button>',			 
										'</div>',
										'<div id="commentArea" ng-show="laundryCtrl.setAt === \'p2\' " class="order-wrap order-part3">',
										 	'<button ng-click="laundryCtrl.setAt = \'p1\' " class="go-back redish-button"><i class="fa fa-chevron-left" aria-hidden="true"></i>Back</button>',
										 	'<div class="row-center-title">Comments or Special Requests</div>',
										 	'<div class="col-xs-12 main-label">Comments or Special Requests</div>',
										 	'<div class="col-xs-12">',
                     		'<label>Comments</label>',
                     		'<textarea  rows="8"  ng-model="laundryCtrl.order.comments"  type="text" class="form-control"></textarea>',
                  			'</div>',
                  			'<div class="col-xs-12">',
                     			'<div ng-click="laundryCtrl.setAt = \'p3\' " class="btn btn-primary submit-form-butt">{{laundryCtrl.order.comments ? "Skip" : "Next"}}<i class="fa fa-chevron-right" aria-hidden="true"></i></div>',
                 			 	'</div>',
											 	'</div>',
												'<div ng-show="laundryCtrl.setAt === \'p3\' " class="order-wrap order-part2">',
													 '<button ng-click="laundryCtrl.setAt = \'p2\' " class="go-back redish-button"><i class="fa fa-chevron-left" aria-hidden="true"></i>Back</button>',
												 	 '<div class="col-xs-12 main-label">Will This Be for Pickup or Delivery?</div>',
												 		'<div class="inline-block-divs">',
												 				'<div ng-click="laundryCtrl.orderSet(0)" class="opt-duo for-pickup">For Pickup</div>',
												 				'<div  ng-click="laundryCtrl.orderSet(1)" class="opt-duo for-delivery">For Delivery</div>',
														'</div>',
										 	'</div>',
									'</div>',
							'</div>',
							'<div id="adFrm" class="address-form hidden">',
									'<address-form></address-form>',
							'</div>',
	        '</form>',
				'</section>'
     ].join(''),
     controller: 'LaundryController'
  });
}])
.controller('LaundryController', function($stateParams,searchResults, Orders, Laundromats, orderHandler) {
	console.log('$stateParams', $stateParams);
  var laundryCtrl = this;
  laundryCtrl.hasData = false;
  laundryCtrl.setAt = 'p1';
  laundryCtrl.blockSet = 'laundry set-one';
  laundryCtrl.thisCompany = searchResults.idMatch[$stateParams.id];
  
  
  function innitRest(){
  	laundryCtrl.order = {};
  	laundryCtrl.customer = {};
  	laundryCtrl.address = {};
  	laundryCtrl.order.comments = '';
  	laundryCtrl.order.company_id = $stateParams.id;
	  laundryCtrl.order.socks = 0;
	  laundryCtrl.order.shirts = 0;
	  laundryCtrl.order.underwear = 0;
	  laundryCtrl.order.pants = 0;
	  laundryCtrl.order.fancyshirts = 0;
	  laundryCtrl.order.suits = 0;
	  laundryCtrl.order.total = 0.0;
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
	  
	  orderHandler.business = laundryCtrl.thisCompany;
  	orderHandler.pricing =  priceList;
	  
	  laundryCtrl.orderSet = function(bool){
	  	console.log(bool);
	
	  	laundryCtrl.order.type = bool ? 'Delivery' : 'Pickup';
	 
	  	document.getElementById('mainForm').style.display = 'none';
	  	var section = document.getElementById('laundryBlock');
	  	section.className = 'laundry form-last';
	  	section.querySelector('#adFrm').className = 'address-form';
	  	
	  };

	  laundryCtrl.tap = function($event){
	  	
	  	var item = $event.target.dataset.tp;
	  	if(item){
	  		laundryCtrl.order[item] += 1;
	  		laundryCtrl.order.total =  totalPrice();
	  	}
	  };
	  laundryCtrl.qtySum = function(price, qty, rfkey){
	  	laundryCtrl.order.total =  totalPrice();
	  	return  parseFloat(price) * parseInt(qty);
	  };
	  laundryCtrl.getLaundryList = function(){
	      console.log('laundryCtrl.order',laundryCtrl.order);
	      console.log('laundryCtrl.customer',laundryCtrl.customer);
	      console.log('laundryCtrl.address',laundryCtrl.address);
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
}).directive('addressForm', function(){
	return {
		template:  _laundryTemplate.addressForm
	}
}); 

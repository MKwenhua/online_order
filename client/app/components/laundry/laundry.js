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
						 '<form id="laundryList"  >',
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
.controller('LaundryController', function($stateParams,searchResults, Orders, Laundromats, Customers, orderHandler,$http)  {
	console.log('$stateParams', $stateParams);
  var laundryCtrl = this;
  laundryCtrl.hasData = false;
  laundryCtrl.setAt = 'p1';
  laundryCtrl.blockSet = 'laundry set-one';
  laundryCtrl.thisCompany = searchResults.idMatch[$stateParams.id];
  
  
  function innitRest(){
  	laundryCtrl.extra = {};
  	laundryCtrl.order = {socks:0, shirts:0, underwear:0,pants:0, fancyshirts:0,suits:0 , total: 0.0};
  	laundryCtrl.customer = {last_name:'' ,first_name: '', email: '', main_address: ''};
  	laundryCtrl.customer.ph = {areacode:'', phone: ''};
  	laundryCtrl.address = {aptno: '', street: '', city: '', state: '', zip: ''};
  	laundryCtrl.extra.pickup = new Date();
  	laundryCtrl.extra.destination = '';
  	laundryCtrl.order.comments = '';
  	laundryCtrl.order.laundromat_id = parseInt($stateParams.id);
	 
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
	   				total += (laundryCtrl.order[key] * priceList[key]);
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
	  laundryCtrl.phoneFormat = function(ph){
	  	var areacode = '(' + ph.areacode.replace(/\D/g,'') + ') ';
	  	var phone = ph.phone.replace(/\D/g,'');
	  	return areacode + phone.substring(0, 3)+'-'+ phone.substring(3);
	  };
	  laundryCtrl.formatAddress =  function(address){
	  		var adr = address.street ? address.street + ' , ' : '';
	  		adr += address.aptno ? address.aptno + ' , ': '';
	  		adr += address.city ? address.city + ' , ': '';
	  		adr += address.state ? address.state + ' ': '';
	  		adr += address.zip;
	  	return	adr;
	  };
	  laundryCtrl.getLaundryList = function(){
	  	laundryCtrl.customer.main_address = laundryCtrl.formatAddress(laundryCtrl.address);
	  	laundryCtrl.extra.destination = laundryCtrl.customer.main_address;
	  	laundryCtrl.customer.phone = laundryCtrl.phoneFormat(laundryCtrl.customer.ph);
	  	console.log('laundryCtrl.order',laundryCtrl.order);
	    console.log('laundryCtrl.customer',laundryCtrl.customer);
	    console.log('laundryCtrl.address',laundryCtrl.address);
	
			var data = JSON.stringify({ 
					  		pickup_time: laundryCtrl.extra.pickup,
					  		destination: laundryCtrl.extra.destination,
					  		order: laundryCtrl.order,
					  		customer: laundryCtrl.customer,
					  		address: laundryCtrl.order.destination
					  	});
			Customers.findOne({where: {email: laundryCtrl.customer.email}})
				.$promise 
			  .then(function(data) { 
			  	
			  console.log(data); 
			  		
			  });
  /* 
	 	Customers.getCustomersId({email: laundryCtrl.customer.email, first_name: laundryCtrl.customer.first_name,
	 	last_name: laundryCtrl.customer.last_name, phone: laundryCtrl.customer.phone, 
	 	main_address: laundryCtrl.customer.main_address })
						 	.$promise 
							  .then(function(data) { 
							  	
							  console.log(data); 
							  		
							  }); */
	/*	Customers.findOrCreate(
		  { where: {or: [{email: laundryCtrl.customer.email}, {phone: laundryCtrl.customer.phone}]}},  // Where filter
		  { email: laundryCtrl.customer.email, first_name: laundryCtrl.customer.first_name,
	 	last_name: laundryCtrl.customer.last_name, phone: laundryCtrl.customer.phone, 
	 	main_address: laundryCtrl.customer.main_address },  // Data to insert
		  function(error, instance, created) {  // Callback
		    if (error) throw error;
		    if (created) {
		      console.log('Object already exists: \n', instance);
		    } else {
		      console.log('Already existed.', instance);
		    }
		  });*/
/*
			function ifSuccess(data){
				console.log(data);
			}
			function ifError(err){
				console.error(err);
			}
			$http({
				method: 'POST',
				url: '/customapi/orderForPickUp',
				data: { data: data },
				}).then(ifSuccess, ifError);*/
		//  $http.post('/customapi/orderForPickUp', data ).then(ifSuccess, ifError);
	/*	 Customers.orderForPickup({ data: data })
      .$promise 
		  .then(function(data) { 
		  	
		  	console.log(data); 
		  
		  }); */

	      
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

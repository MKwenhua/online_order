var _laundryTemplate = (function(){
	function objectConstructor(){

	function formBuilder (icon, itemtype, ctrlcall, itemName) {
		return [
		'<div class="clothes-item" >',
		  '<div data-tp="',itemtype,'" class="clothes-type-butt inline-item">',
					'<img data-tp="',itemtype,'" width="30" height="30" ng-src="https://canvasmp3.s3.amazonaws.com/',icon,'">',
			'</div>',
			'<div class="price-input inline-item">',
	    		'<input name="',itemtype,'" type="number" ng-model="laundryCtrl.',itemtype,'" class="form-control" value="0" min="0" max="99">',
	    '</div>',
			'<div class="cost-dis inline-item">',
					'<span class="cost-per">',itemName,'</span><span>{{',ctrlcall,' | currency:"£":2}}</span><span>per unit</span>',
	    '</div>',
	    '<div class="inline-item total-price">',
	    	 '{{laundryCtrl.',itemtype,' + " : "}} {{ laundryCtrl.qtySum(',ctrlcall,', laundryCtrl.',itemtype,', ',itemtype,') | currency:"£":2 }}',
	    '</div>',
	  '</div>'].join('');
	
	};

	var x = [ ['t_shirt.png','shirts', 'laundryCtrl.thisCompany.p_shirt', 'Shirt'],
					  ['socks.png', 'socks','laundryCtrl.thisCompany.p_socks', 'Sock' ],
					  ['underwear.png', 'underwear','laundryCtrl.thisCompany.p_undies', 'Underwear' ],
					  ['normal_pants.png', 'pants','laundryCtrl.thisCompany.p_pants', 'Pants' ],
					  ['dress_shirt.png', 'fancyshirts','laundryCtrl.thisCompany.p_fancyShirt', 'Dress Shirt' ],
					  ['suit.png', 'suits','laundryCtrl.thisCompany.p_suit', 'Suit' ]
			    ];

	return x.map(function(xArr){ return formBuilder( xArr[0],xArr[1],xArr[2],xArr[3])}).join('');
	
	};
	function finalForm(){
	return [
	'<div class="container">',
	   '<div class="form-holder">',
	      '<div class="col-md-offset-2 col-md-8 col-sm-offset-1 col-sm-10">',
	         '<div class="row-center-title">',
	            'Place Your Order',
	         '</div>',
	         '<div class="row">',
	            '<div class="col-xs-12 main-label">',
	               'Customer Information',
	            '</div>',
	            '<div class="col-xs-12">',
	               '<label>Name</label>',
	               '<input type="text" class="form-control"  required value=" "/>',
	            '</div>',
	         '</div>',
	         '<div class="row">',
	            '<div class="padder"></div>',
	            '<div class="col-xs-9">',
	               '<label>Street Address</label>',
	               '<input type="text" class="form-control" required  value=" "/>',
	            '</div>',
	            '<div class="col-xs-3">',
	               '<label>Unit #</label>',
	               '<input type="text" class="form-control" value=" " id="aptLoc"  />',
	            '</div>',
	         '</div>',
	         '<div class="row">',
	            '<div class="padder"></div>',
	            '<div class="col-xs-7">',
	               '<label>City</label>',
	               '<input type="text" class="form-control" id="cityLoc"  value=" "/>',
	            '</div>',
	            '<div class="col-xs-2">',
	               '<label>State</label>',
	               '<input type="text" class="form-control"  value=" " />',
	            '</div>',
	            '<div class="col-xs-3">',
	               '<label>Zip Code</label>',
	               '<input type="text" class="form-control"  value=" " />',
	            '</div>',
	         '</div>',
	         '<hr>',
	         '<div id="pickupDate" class="row">',
	            '<div class="col-xs-5 col-change">',
	               '<label>Date</label>',
	               '<input type="date" id="datePick" class="form-control" ng-model="dateString"  name="pickup"  value=" ">',
	            '</div>',
	         '</div>',
	         '<hr>',
	         '<div class="row">',
	            '<div class="col-xs-12">',
	               '<div id="saveLoc" class="btn btn-primary submit-form-butt">Place Order</div>',
	            '</div>',
	         '</div>',
	      '</div>',
	   '</div>',
		'</div>'
		].join('');
	};
	return {
			mat: objectConstructor(),
	    keylist: [ ['shirts','p_shirt'],['socks', 'p_socks'],['pants', 'p_pants'],['underwear', 'p_undies'],
						   ['fancyshirts', 'p_fancyShirt'],['suits' ,'p_suit']],
			addressForm: finalForm()
	}
})();
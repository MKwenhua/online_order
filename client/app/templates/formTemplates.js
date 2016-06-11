app.service('laundryHtml', function(){
	var laundryHtml = this;
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
	laundryHtml.mat = objectConstructor();
	laundryHtml.keylist = [ ['shirts','p_shirt'],['socks', 'p_socks'],['pants', 'p_pants'],['underwear', 'p_undies'],
						   ['fancyshirts', 'p_fancyShirt'],['suits' ,'p_suit']];
	
});
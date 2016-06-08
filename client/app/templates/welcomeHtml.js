var welcomeHTML = {
		first:	'<h2>{{initCtrl.whatsup}}</h2>'
};

var nearbyHTML = {
		mat:	[	'<strong>{{b.name | uppercase}}</strong><br>',
    				'<span>{{b.address}}</span><span>{{b.open}}</span>'
		].join(''),

		dryCleaners: [
		  {
		  	name: 'Stadium Cleaners',
		  	pic: '2028 W Stadium Blvd',
		  	open: true
		  },
		  {
		  	name: 'Elite Cleaners II',
		  	pic: '4065 Stone School Rd',
		  	open: true
		  },
		  {
		  	name: 'Iris Dry Cleaners',
		  	pic: '2268 S Main St',
		  	open: true
		  },
		  {
		  	name: 'K&K Dry Cleaners',
		  	pic: '3018 Packard St',
		  	open: true
		  },
		  {
		  	name: 'State Cleaners',
		  	pic: '3680 S State St',
		  	open: true
		  }
		  ]
};
var clothesForm = {
		mat:	[	
		'<div class="clothes-type-butt inline-item">',
				'<img width="30" height="30" ng-src="https://canvasmp3.s3.amazonaws.com/{{b.icon}}">',
		'</div>',
		'<div class="cost-dis inline-item">',
				'<span class="cost-per">{{b.type}}</span><span>{{b.unitPrice | currency:"£":2}}</span><span>per unit</span>',
    '</div>',
    '<div class="price-input inline-item">',
    		'<input type="number" ng-model="b.modelName" class="form-control" value="0" min="0" max="99">',
    '</div>',
    '<div class="inline-item total-price">',
    '{{b.modelName}} : {{ laundryCtrl.qtySum(b.unitPrice, b.modelName) | currency:"£":2 }}',
    '</div>'
		].join(''),
    getUrl:'https://canvasmp3.s3.amazonaws.com/',
		
		clothesItems: [
		  {
		  	type: 'Shirt',
		  	unitPrice: 1.0,
		  	modelName: 'noShirts',
		  	provided: true,
		  	icon: 't_shirt.png'
		  },
		  {
		  	type: 'Socks',
		  	unitPrice: 0.5,
		  	modelName: 'noSocks',
		  	provided: true,
		  	icon: 'socks.png'
		  },
		  {
		  	type: 'Underwear',
		  	unitPrice: 2.0,
		  	modelName: 'noUnderwears',
		  	provided: true,
		  	icon: 'underwear.png'
		  },
		  {
		  	type: 'Pants',
		  	unitPrice: 3.0,
		  	modelName: 'noPants',
		  	provided: true,
		  	icon: 'normal_pants.png'
		  },
		 {
		  	type: 'Dress Shirt',
		  	unitPrice: 4.0,
		  	modelName: 'noDressShirts',
		  	provided: true,
		  	icon: 'dress_shirt.png'
		  },
		  {
		  	type: 'Suit',
		  	unitPrice: 5.0,
		  	modelName: 'noSuits',
		  	provided: true,
		  	icon: 'suit.png'
		  }
		  ]
};
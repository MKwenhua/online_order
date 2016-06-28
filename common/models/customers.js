


module.exports = function(Customers) {
function createNewCustomer(data){
	return new Promise(function (fulfill, reject){
		app.models.Customers.create({
			email: data.email, 
			phone: data.phone,
			first_name: customer.first_name,
			last_name: customer.last_name,
			main_address: data.main_address},
     function(err, customer){
      	if(err)  reject(err);
      	else fulfill(customer); 
      });
	});
};
	function checkIfCustomer(customer,res){
	return new Promise(function (fulfill, reject){
     Customers.findOne({where: {or: [{email: customer.email}, {phone: customer.phone}]}},
     function(err,result){
      	if(err)  reject(err);
      	else fulfill(result);

      });
	});
};

function newPickup(data,order, res){
		app.models.Pickups.create({
			order_time:new Date(),
			pickup_time: data.pickup_time,
			customer_id: order.customer_id,
			laundromat_id: order.laundromat_id,
			order_id: order.id,
		},function(err, pickup){
			 console.log('pickup', pickup);
           if(err){
           		res.send(err);
           }else{
          	 res.send( pickup);
         	 }
			});
};
function newOrder(customer, data){
	return new Promise(function (fulfill, reject){
			app.models.Orders.create({
					socks: data.socks,
					shirts: data.shirts,
					underwear: data.underwear,
					pants: data.pants,
					fancyshirts: data.fancyshirts,
					suits: data.suits,
					total: data.total,
					customer_comments: data.comments,
					customer_id: customer.id,
					laundromat_id: data.laundromat_id

				},
     		function(err, order){
      			if(err)  reject(err);
      			else fulfill(order); 
      	});
		});
}
function createCustomerAndPickup(data, res){
		createNewCustomer(data.customer).then(function(customer){
			 newOrder(customer, data.order).then(newPickup(order, res));
		});
}
Customers.orderForPickup = function(data, res){
			var data = JSON.parse(data);
     checkIfCustomer(data).then(function(data){
     			if(data){
     				newOrder(customer, data).then(newPickup(data,order, res));
     			}else{

     				createCustomerAndPickup(data, res);
     			}
     });
   
};
  Customers.createNewDelivery = function (email, phone, cb) {
  	
   	  console.log('got emailPhone',email, phone);

      Customers.findOne({where: {or: [{email:email}, {phone: phone}]}}, 
          function (err, customer) {
           console.log('customer', customer);
           var customer
           cb(err, customer);
  		});
  	

    };
  Customers.getCustomersId = function(customer, cb){
  	 
  	 Customers.findOne({where: {or: [{email: customer.email}, {phone: customer.phone}]}},
     function(err,result){
      	if(err)  console.error(err);
      	else if(result){
      		cb(result);
      	}else{
      		Customers.create({
						email: customer.email, 
						phone: customer.phone,
						first_name: customer.first_name,
						last_name: customer.last_name,
						main_address: customer.main_address},
			     function(err, data){
			      	
			      			cb(data);
			      	
			      });

      	}

      });
  };
    Customers.remoteMethod(
        'orderForPickup',
        {
            http: { verb: 'post' },
              description: 'Creates a new Pickup Order',
           accepts:{arg: 'data', type: 'string' },
           	returns: { arg: 'data', type: 'object', root: true }
        }
    );
     Customers.remoteMethod(
        'getCustomersId',
        {
            http: { verb: 'get' },
           description: 'Creates a new Pickup Order',
              accepts: [{ arg: 'email', type: 'string' },
            {  arg: 'phone', type: 'string' },
            { arg: 'first_name', type: 'string'},
            { arg: 'last_name', type: 'string'},
            { arg: 'main_address', type: 'string'}],
           returns: { arg: 'data', type: 'object', root: true }
        }
    );
    Customers.remoteMethod(
        'createNewDelivery',
        {
            http: { verb: 'get' },
            description: 'Check if customer already exists',
            accepts: [{ arg: 'email', type: 'string' },
            {  arg: 'phone', type: 'string' }],
           	returns: { arg: 'customer', type: 'object', root: true }
        }
    );

};

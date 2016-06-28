module.exports = function(app) {

function createNewCustomer(data){
	return new Promise(function (fulfill, reject){
		app.models.Customers.create({
			email: data.email, 
			phone: data.phone,
			first_name: data.first_name,
			last_name: data.last_name,
			main_address: data.main_address},
     function(err, customer){
      	if(err)  reject(err);
      	else fulfill(customer); 
      });
	});
};

function checkIfCustomer(customer,res){
	return new Promise(function (fulfill, reject){
	app.models.Customers.findOne({where: {or: [{email: customer.email}, {phone: customer.phone}]}},
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
			 newOrder(customer, data.order).then(newPickup(data,order, res));
		});
}
return {
   checkIfPhoneOrEmail: function(data, res){
   		 app.models.Laundromats.findOne({where: {or: [{email: data.email}, {phone: data.phone}]}}, 
          function (err, laundromat) {
           console.log('laundromat', laundromat);
           if(err){
           		res.send(err);
           }else{
          	 res.send( laundromat);
         	 }
  		});
   }, 
   orderForPickup: function(data, res){
     checkIfCustomer(data.customer).then(function(customer){
     			if(customer){
     				newOrder(customer, data.order).then(newPickup(data,order, res));
     			}else{

     				createCustomerAndPickup(data, res);
     			}
     });
   }
}
};


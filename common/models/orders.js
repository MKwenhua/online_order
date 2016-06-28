

module.exports = function(Orders) {
//  function yo(err, laundromat){
  //	console.log('laundromat', laundromat);
 // }
   Orders.orderForPickUp = function (theorder, cb) {
   	 
   		console.log('theorder', theorder);
   		
      //var ds = Orders.dataSource;
     //  Customers.findOne({email: theorder.email}, function(err, user) {
 					 
			//	});
  /*    app.models.Laundromats.findOne({where: {or: [{email:'dryclean0@example.com'}, {phone: '(734) 358-7765'}]}}, 
                                     function (err, laundromat) {
           console.log('laundromat', laundromat);
           cb(err, laundromat);
  		}); */
         
		 
     //  TestModel.testRemoteMethod = function (id, name, cb) {
      //  TestModel.findOne({where: {id: id}}, function(err, modelInstance) {
            //modelInstance has properties here and can be returned to
            //the API call using the callback, for example:
        //    cb(null, {"name": modelInstance.name});
       // }
    //	}

    };
    Orders.orderForDelivery = function (theorder, cb) {
   	 
   		console.log('theorder', theorder);
      var ds = Orders.dataSource;
      // Customers.findOne({email: theorder.email}, function(err, user) {
 					 
				//});
      var sql = 'SELECT * FROM laundromats WHERE email = ?;';
      var email = 'dryclean0@example.com';
      ds.connector.query(sql, email, function (err, data) {

            if (err) console.error(err);
            console.log(data);
            cb(err, data);

        });

    };

    Orders.remoteMethod(
        'orderForPickUp',
        {
            description: 'Create new order and do validations',
            http: { verb: 'post'},
            accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
            returns: { arg: 'data', type: 'object', root: true }
        }
    );
    Orders.remoteMethod(
        'orderForDelivery',
        {
            description: 'Create new order and do validations',
            http: { verb: 'post'},
            accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
            returns: { arg: 'data', type: 'object', root: true }
        }
    );
};

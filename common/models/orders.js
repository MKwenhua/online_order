module.exports = function(Orders) {
  
   Orders.orderForPickUp = function (theorder, cb) {
   	 
   		console.log('theorder', theorder);
      var ds = Orders.dataSource;
       Customers.findOne({email: theorder.email}, function(err, user) {
 					 
				});
        
      //ds.connector.query(sql, function (err, orders) {

        //    if (err) console.error(err);

          //  cb(err, orders);

        //});

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

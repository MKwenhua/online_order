var Promise = require('bluebird');
module.exports = function(Laundromats) {
  	Laundromats.checkEmailPhone = function (email, phone, cb) {
  	
   	  console.log('got emailPhone',email, phone);
    //  var p1 = data.split('<>');
     
      Laundromats.findOne({where: {or: [{email:email}, {phone: phone}]}})
      .then(function(laundromat){
      	console.log('laundromat', laundromat);
      }).catch(function(err){
      	console.error(err);
      });
          

    }; 
    Laundromats.remoteMethod(
        'checkEmailPhone',
        {
            http: { verb: 'get' },
            description: 'Check if',
            accepts: [{ arg: 'email', type: 'string' },
            {  arg: 'phone', type: 'string' }],
           	returns: { arg: 'laundromat', type: 'object', root: true }
        }
    );


   Laundromats.getNearby = function (coordinates, cb) {
   	  console.log('got coordinates',coordinates);
   		var sql = ['SELECT * FROM "laundromats"  WHERE ',
   							 '(st_dwithin(lonlatg, ST_SetSRID(ST_MakePoint( ',
   								coordinates.replace(/\'/g, ""),
   							 ' ), 4326) ,4000));'].join('');

   		console.log('sql', sql);
      var ds = Laundromats.dataSource;
       
        
      ds.connector.query(sql, function (err, laundromats) {

            if (err) console.error(err);

            cb(err, laundromats);

        });

    };

    Laundromats.remoteMethod(
        'getNearby',
        {
            http: { verb: 'get' },
            description: 'Get list of Laundromats nearby',
            accepts: { arg: 'coordinates', type: 'string' },
            returns: { arg: 'data', type: ['Laundromats'], root: true }
        }
    );
};

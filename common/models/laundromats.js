module.exports = function(Laundromats) {
  
   Laundromats.getNearby = function (coordinates, cb) {
   	  console.log('got coordinates',coordinates);
   		//var twoPnts = '-83.73386359999999, 42.2749874';
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

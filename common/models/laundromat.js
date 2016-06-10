module.exports = function(Laundromat) {
  
   Laundromat.getNearby = function (lonlatg, cb) {
   		var twoPnts = '-83.73386359999999, 42.2749874';
   		var point =  'st_dwithin(lonlatg, ST_SetSRID(ST_MakePoint( '+ twoPnts +' ), 4326)';
      var ds = Laundromat.dataSource;
      var sql = ['SELECT * FROM "laundromats"  WHERE (', point ,' ,4000));'].join('');
        
      ds.connector.query(sql, lonlatg, function (err, laundromats) {

            if (err) console.error(err);

            cb(err, laundromats);

        });

    };

    Laundromat.remoteMethod(
        'getNearby',
        {
            http: { verb: 'get' },
            description: 'Get list of Laundromats nearby',
            accepts: { arg: 'category', type: 'string' },
            returns: { arg: 'data', type: ['Laundromat'], root: true }
        }
    );
};

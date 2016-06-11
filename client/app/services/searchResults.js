app.service('searchResults', function() {
   var searchResults = this;
   searchResults.idMatch = {};
   searchResults.lmats = [];
   searchResults.mapResults = function(dta) {
      if (!(dta instanceof Array)) return '';
      searchResults.lmats = dta;
      searchResults.idMatch = dta.reduce(function(obj, itm) {
         obj[itm.id] = itm;
         return obj;
      }, {});
   };

});
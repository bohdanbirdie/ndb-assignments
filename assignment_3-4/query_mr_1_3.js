var map = function() {
  emit(this.job, {
    count: 1
  });
};

var reduce = function(key, prices) {
  var price = {
    count: 0
  };

  prices.forEach(function(wartosc) {
    price.count += wartosc.count;
  });

  return price;
};

printjson(
  db.ollection.mapReduce(map, reduce, {
    out: "uniqueJobs",
    finalize: finalize
  })
);

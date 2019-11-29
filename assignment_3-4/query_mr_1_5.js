var map = function() {
  if (!this.credit) return;

  this.credit.forEach(function(credit) {
    emit(credit.currency, {
      count: 1,
      balance: parseFloat(credit.balance) || 0
    });
  });
};

var reduce = function(key, values) {
  var params = {
    count: 0,
    balance: 0
  };

  values.forEach(function(value) {
    params.count += value.count;
    params.balance += value.balance;
  });

  return params;
};

var finalize = function(key, params) {

  params.avg = (params.balance / params.count).toFixed(2);
  params.sum = params.balance;
  delete params.balance;
  return params;
};

printjson(
  db.ollection.mapReduce(map, reduce, {
    query: {
      nationality: "Poland",
      sex: "Female"
    },
    out: "task5",
    finalize: finalize
  })
);

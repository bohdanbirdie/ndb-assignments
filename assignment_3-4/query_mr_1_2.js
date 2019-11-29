var count;
var currency;

var map = function() {
  if (!this.credit) return;

  this.credit.forEach(function(credit) {
    count = parseFloat(credit.balance) || 0;
    currency = credit.currency;

    emit(currency, count);
  });
};

var reduce = function(key, prices) {
  return Array.sum(prices);
};

printjson(
  db.ollection.mapReduce(map, reduce, {
    out: "moneyAmount"
  })
);

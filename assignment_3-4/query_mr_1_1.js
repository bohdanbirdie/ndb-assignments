var map = function () {
  emit(this.sex, {
    count: 1,
    height: parseFloat(this.height),
    weight: parseFloat(this.weight),
  });
};

var reduce = function (key, values) {
  var params = {
    count: 0,
    height: 0,
    weight: 0,
  };

  values.forEach(function (value) {
    params.count += value.count;
    params.height += value.height;
    params.weight += value.weight;
  });

  return params;
};

var finalize = function (key, params) {
  params.height = params.height / params.count;
  params.weight = params.weight / params.count;

  return params;
};

printjson(db.ollection.mapReduce(map, reduce, {
  out: 'averageWH',
  finalize: finalize,
}));
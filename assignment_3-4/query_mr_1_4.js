var map = function() {
  var bmi = function(weight, height) {
    return weight / Math.pow(height / 100, 2);
  };

  var weight = parseFloat(this.weight);
  var height = parseFloat(this.height);

  emit(this.nationality, {
    count: 1,
    sum: bmi(weight, height),
    min: bmi(weight, height),
    max: bmi(weight, height)
  });
};

var reduce = function(key, values) {
  var params = {
    count: 0,
    sum: 0,
    min: values[0].min,
    max: values[0].max
  };

  values.forEach(function(value) {
    params.count += value.count;
    params.sum += value.sum;
    params.min = Math.min(params.min, value.min);
    params.max = Math.max(params.max, value.max);
  });

  return params;
};

var finalize = function(key, params) {
  params.avg = params.sum / params.count;
  delete params.sum;
  return params;
};

printjson(
  db.ollection.mapReduce(map, reduce, {
    out: "bmi",
    finalize: finalize
  })
);

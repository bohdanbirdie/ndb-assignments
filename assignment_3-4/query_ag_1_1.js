printjson(
  db.ollection.aggregate([
    {
      $group: {
        _id: "$sex",
        avgHeight: { $avg: "$height" },
        avgWeight: { $avg: "$weight" },
        count: { $sum: 1 }
      }
    }
  ])
);

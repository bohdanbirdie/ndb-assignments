printjson(
  db.ollection.aggregate([
    {
      $group: {
        _id: "$job",
        count: { $sum: 1 }
      }
    }
  ])
);

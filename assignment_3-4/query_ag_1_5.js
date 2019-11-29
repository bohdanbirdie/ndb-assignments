printjson(
  db.ollection.aggregate([
    { $match: { sex: "Female", nationality: "Poland" } },
    { $unwind: "$credit" },
    {
      $group: {
        _id: "$credit.currency",
        avgBalance: { $avg: "$credit.balance" },
        sumBalance: { $sum: "$credit.balance" },
        count: { $sum: 1 }
      }
    }
  ])
);

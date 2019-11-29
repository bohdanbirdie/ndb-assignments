printjson(
  db.ollection.aggregate([
    {
      $project: {
        nationality: 1,
        weight: 1,
        height: 1
      }
    },
    {
      $group: {
        _id: "$nationality",
        max: {
          $max: {
            $divide: ["$weight", { $pow: [{ $divide: ["$height", 100] }, 2] }]
          }
        },
        min: {
          $min: {
            $divide: ["$weight", { $pow: [{ $divide: ["$height", 100] }, 2] }]
          }
        },
        avg: {
          $avg: {
            $divide: ["$weight", { $pow: [{ $divide: ["$height", 100] }, 2] }]
          }
        },
        count: { $sum: 1 }
      }
    }
  ])
);

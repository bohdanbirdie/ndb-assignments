printjson(db.ollection.update({ job: "Editor"}, { $unset: { email: 1 }}, {multi: true}));

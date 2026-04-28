use("coworking_db");

db.reservations.updateMany(
    { source_reservation: { $exists: false } },
    { $set: { source_reservation: "web" } }
)

const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
  {
    reservedBy: {
      type: String,
    },

    tableSize: {
      type: Number,
      default: 2,
    },
    date: { type: Date, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reservation", ReservationSchema);

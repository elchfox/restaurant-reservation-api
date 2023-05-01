const mongoose = require("mongoose");

const InfoSelectSchema = new mongoose.Schema(
  {

    dinners: { type: [Number], require: true },
    openingHours: {

      Monday: {
        open: String,
        close: String,
      },
      Tuesday: {
        open: String,
        close: String,
      },
      Wednesday: {
        open: String,
        close: String,
      },
      Thursday: {
        open: String,
        close: String,
      },
      Friday: {
        open: String,
        close: String,
      },
      Saturday: {
        open: String,
        close: String,
      },
      Sunday: {
        open: String,
        close: String,
      },
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Info", InfoSelectSchema);

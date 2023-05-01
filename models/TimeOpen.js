const mongoose = require("mongoose");

const OpeningHoursSchema = new mongoose.Schema(
  {
    Sunday: {
      open: String,
      close: String
    },
    Monday: {
      open: String,
      close: String
    },
    Tuesday: {
      open: String,
      close: String
    },
    Wednesday: {
      open: String,
      close: String
    },
    Thursday: {
      open: String,
      close: String
    },
    Friday: {
      open: String,
      close: String
    },
    Saturday: {
      open: String,
      close: String
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OpeningHours", OpeningHoursSchema);

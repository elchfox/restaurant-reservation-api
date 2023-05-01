const mongoose = require("mongoose");

const TimesSelectSchema = new mongoose.Schema(
  {

    time: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TimesSelect", TimesSelectSchema);

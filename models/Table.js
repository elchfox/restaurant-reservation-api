const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema(
  {
    tableSize: {
      type: Number,
      default: 2,
      unique: true
      
    },
    total: {
      type: Number,default:1
    },
  },
 
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Table", TableSchema);

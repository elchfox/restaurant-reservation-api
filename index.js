const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const apiRoute = require("./routes/api");
const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.DB_HOST)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api", apiRoute);


app.listen(process.env.PORT || 5001, () => {
  console.log("Backend server is running!");
});

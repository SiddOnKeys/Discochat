require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = 3005;
const db = mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log("MongoDB Connection Succeeded.");
  })
  .catch((error) => {
    console.log("Error in DB connection: " + error);
  });

const router = require("./router");
app.use("/", router);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

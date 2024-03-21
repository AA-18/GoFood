const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongoDB = require("./db");
const createUser = require("./Routes/CreateUser");
const displayData = require("./Routes/DisplayData");
const orderData = require("./Routes/OrderData");
const app = express();
mongoDB();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", createUser);
app.use("/api", displayData);
app.use("/api", orderData);



app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.listen(8080, () => {
  console.log("Server listening on port 8080!");
});

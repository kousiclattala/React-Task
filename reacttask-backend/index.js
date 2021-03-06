const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./routes/authRoute");
const candidate = require("./routes/candidateRoute");

//connecting to db, here db connection string should be present in env file.
mongoose
  .connect("mongodb://127.0.0.1:27017/candidateportal")
  .then((res) => {
    console.log("DB GOT CONNECTED");
  })
  .catch((err) => {
    console.log("err in db connection: ", err);
  });

//using middlewares to accept req in json, and also allowing req from other origin.
app.use(express.json());
app.use(cors());

//middleware for routes.
app.use("/api/v1", auth);
app.use("/api/v1", candidate);

//listening to server
app.listen(4000, () => console.log("Server started on Port: 4000"));

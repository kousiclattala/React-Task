const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./routes/authRoute");
const candidate = require("./routes/candidateRoute");

mongoose
  .connect("mongodb://127.0.0.1:27017/candidateportal")
  .then((res) => {
    console.log("DB GOT CONNECTED");
  })
  .catch((err) => {
    console.log("err in db connection: ", err);
  });

app.use(express.json());
app.use(cors());

app.use("/api/v1", auth);
app.use("/api/v1", candidate);

app.listen(4000, () => console.log("Server started on Port: 4000"));

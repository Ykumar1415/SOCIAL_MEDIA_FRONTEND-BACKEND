const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const env = require("dotenv").config();
const cors = require("cors");
const fileupload = require("express-fileupload");

const MONGODB_URI = process.env.Uri;

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(fileupload({
  useTempFiles : true,//to create a temporary file in the server
  tempFileDir : '/tmp/'
}));
app.use(morgan("common"));
const userpostRouter = require("./routes/userpost");
const userDetails = require("./models/user");
const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);
 
app.use("/api/posts", userpostRouter);
const userRoute = require("./routes/users");
app.use("/api/users", userRoute);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("db connected");
    app.listen(3000 || 300);
  })
  .catch((err) => {
    console.log(err);
  });

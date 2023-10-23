const express = require("express");
const cors = require('cors');
const app = express();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const wordRoute = require("./routes/words");

// const quizRoute = require("./routes/quiz");

const PORT = 5000;
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
require("dotenv").config();


// connecting database
mongoose
  .connect(process.env.MONGOURL).
  then(() => {
    console.log("connecting database");
  })
  .catch((err) => {
    console.log(err);
  });

// mongoose.set("debug", true);

// setUp of middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
)
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/words", wordRoute);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/userRoutes")
const errorHandler = require("./middleware/errorMiddleware")

const app = express();

///middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
   cors({
      origin: ["http://localhost:3000"],
      credentials: true,
   })
);


//routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
   res.send("Home page");
});

//error handler middleware
app.use(errorHandler);



const PORT = process.env.PORT || 5000;

mongoose
   .connect(process.env.MONGO_URI)
   .then(() => {
      app.listen(PORT, () => {
         console.log(`Server running on ${PORT}`);
      });
   })
   .catch((error) => {
      console.log(error);
   });

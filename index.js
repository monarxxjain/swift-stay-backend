const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const userRouter = require("./router/userRouter");
const hotelRouter = require("./router/hotelRouter");
const imageRouter = require("./router/imageRouter");
const transportRouter = require("./router/transportRouter");
const moduleRouter = require("./router/moduleRouter");
const tagRouter = require("./router/tagRouter");
const appRouter = require("./router/appRouter");
const bookingRouter = require("./router/bookingRouter");

const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");
const cors = require("cors");

const app = express();
dotenv.config();

// cors policy
app.use(
  cors({
    origin: "*", // Your allowed origin
    credentials: true, // Allow cookies to be sent
  })
);

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successfull!"))
  .catch((err) => {
    console.error(err);
  });

// request parsers
app.use(express.json());

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
// user router
app.use("/user", userRouter);


// hotel router
app.use("/hotel", hotelRouter);

// image
app.use("/image", imageRouter);

// transport router
app.use("/transport", transportRouter);

// module router
app.use("/module", moduleRouter);

// tag router
app.use("/tag", tagRouter);

// app router
app.use("/app", appRouter);

// booking router
app.use("/booking", bookingRouter);

// 404 handler
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

// run the application
const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (!err) {
    console.log("App listening port: ", port);
  } else {
    console.error("There is somthing errors");
  }
});

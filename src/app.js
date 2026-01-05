if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

// TODO: Add your code here
 const cors = require("cors");

 app.use(cors());
 app.use(express.json());

 app.use("/movies", moviesRouter);
 app.use("/theaters", theatersRouter);
 app.use("/reviews", reviewsRouter);



// Not found handler
app.use((req, res) => {
  res.status(404).json({ error: `Not found: ${req.originalUrl}` });
});


// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "error"} = error;
  res.status(status).send({ error: message });
});

module.exports = app;

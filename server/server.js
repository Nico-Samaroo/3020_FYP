require("dotenv").config();

// Configure the api server
const express = require("express");
const cors = require("cors");
const apiRouter = require("./api");

function startServer() {
  const app = express();

  app.use(cors());
  app.use("/api", apiRouter);

  const port = process.env.PORT || 3000;
  app.listen(port, () =>
    console.log(`Server running at http://localhost:${port}`)
  );
}

// Connect the database then start the server
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Database connected");
  startServer();
});

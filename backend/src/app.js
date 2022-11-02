const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./errors/errorHandler");

const foodRouter = require("./food/food.router.js");

const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/food", foodRouter);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Welcome to the Food API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

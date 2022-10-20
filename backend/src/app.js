const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const foodRouter = require("./food/food.router.js");

const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/food", foodRouter);

app.listen(PORT, () => {
  console.log("Connected to database");
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const yelp = require("yelp-fusion");
const dotenv = require("dotenv");
const client = yelp.client(process.env.APP_YELP_KEY);

const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const response = await client.search({
      term: "Four Barrel Coffee",
      location: "san francisco, ca",
    });

    res.json({ data: response.jsonBody.businesses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
app.listen(PORT, () => {
  console.log("Connected to database");
  console.log(`Server is running on port ${PORT}`);
});

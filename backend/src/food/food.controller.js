const dotenv = require("dotenv");
const yelp = require("yelp-fusion");
dotenv.config();
const client = yelp.client(process.env.APP_YELP_KEY);

function checkFoodLocation(req, res, next) {
  const { location } = req.body;

  if (location === "") {
    return next({
      status: 400,
      message: "location cannot be empty",
    });
  }

  next();
}

const read = async (req, res) => {
  const { location } = req.body;

  try {
    const response = await client.search({
      term: "Coffee",
      location: `${location} airport`,
      radius: 1609,
    });

    res.json({ data: response.jsonBody.businesses.slice(0, 4) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  read: [checkFoodLocation, read],
};

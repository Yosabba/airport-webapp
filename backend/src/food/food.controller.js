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
  const { id } = req.params;

  try {
    const response = await client.business(id);

    res.json(response.jsonBody);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const list = async (req, res) => {
  const { location } = req.body;

  try {
    const response = await client.search({
      term: "Food",
      location: `${location} airport`,
      radius: 1609,
    });

    res.json(response.jsonBody.businesses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  read: [checkFoodLocation, read],
  list,
};

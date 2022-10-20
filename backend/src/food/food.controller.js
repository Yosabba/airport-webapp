const dotenv = require("dotenv");
const yelp = require("yelp-fusion");
dotenv.config();
const client = yelp.client(process.env.APP_YELP_KEY);

const list = async (req, res) => {
  try {
    const response = await client.search({
      term: "Coffee",
      location: "ATL airport",
      radius: 1609,
    });

    res.json({ data: response.jsonBody.businesses.slice(0, 4) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
function checkFoodTerm(req, res, next) {
  const { term } = req.body;

  if (term === "") {
    return next({
      status: 400,
      message: "term cannot be empty",
    });
  }
}

function checkFoodLocation(req, res, next) {
  const { location } = req.body;

  if (location === "") {
    return next({
      status: 400,
      message: "location cannot be empty",
    });
  }
}
const read = (req, res) => {};

module.exports = {
  list,
};

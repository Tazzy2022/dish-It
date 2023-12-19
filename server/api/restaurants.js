//To authenticate API calls with the API Key, set the Authorization HTTP header value as Bearer API_KEY.
const BASE_URL = "https://api.yelp.com/v3/businesses/";
const router = require("express").Router();
const needle = require("needle");
require("dotenv").config();

//GET /api/restaurants/city/:location
router.get("/city/:location", async (req, res, next) => {
  try {
    const restaurants = await needle(
      "get",
      `${BASE_URL}search?location=${req.params.location}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );
    const data = restaurants.body;
    data["testMsg"] = "got here";
    res.send(data);
  } catch (err) {
    res.status(404).json({
      message: "could not find any restaurants",
      error: err.message,
    });
    next(err);
  }
});

//GET /api/restaurants/price/:pricing/:location  get restaurants by location and pricing
router.get("/price/:pricing/:location", async (req, res, next) => {
  try {
    const restaurants = await needle(
      "get",
      `${BASE_URL}search?location=${req.params.location}${req.params.pricing}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );
    const data = restaurants.body;
    res.send(data);
  } catch (err) {
    res.status(404).json({
      message: "could not find any restaurants",
      error: err.message,
    });
    next(err);
  }
});

//GET /api/restaurants/catPrice/:category/:location
router.get("/catPrice/:category/:location", async (req, res, next) => {
  try {
    const restaurants = await needle(
      "get",
      `${BASE_URL}search?location=${req.params.location}${req.params.category}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );
    const data = restaurants.body;
    res.send(data);
  } catch (err) {
    res.status(404).json({
      message: "could not find any restaurants",
      error: err.message,
    });
    next(err);
  }
});

//GET /api/restaurants/allFilters/location/categories/price
router.get(
  "/allFilters/:location/:allCategories/:pricing",
  async (req, res, next) => {
    try {
      const restaurants = await needle(
        "get",
        `${BASE_URL}search?location=${req.params.location}${req.params.allCategories}${req.params.pricing}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
        }
      );
      const data = restaurants.body;
      res.send(data);
    } catch (err) {
      res.status(404).json({
        message: "could not find any restaurants",
        error: err.message,
      });
      next(err);
    }
  }
);

//GET https://api.yelp.com/v3/businesses/north-india-restaurant-san-francisco
//GET /api/restaurants/:search  get specific restaurant by name
router.get("/:search", async (req, res, next) => {
  try {
    const restaurant = await needle("get", `${BASE_URL}${req.params.search}`, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    });
    const data = restaurant.body;
    res.send(data);
  } catch (err) {
    res.status(404).json({
      message: "could not find that restaurant",
      error: err.message,
    });
    next(err);
  }
});
module.exports = router;

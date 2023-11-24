//To authenticate API calls with the API Key, set the Authorization HTTP header value as Bearer API_KEY.
const BASE_URL = "https://api.yelp.com/v3/businesses/";
const router = require("express").Router();
const needle = require("needle");
require("dotenv").config();

//GET /api/restaurants/location/id
router.get("/location/:id", async (req, res, next) => {
  try {
    const restaurants = await needle(
      "get",
      `${BASE_URL}search?location=${req.params.id}`,
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

//GET /api/restaurants/:location/:price  get restaurants by location and pricing
router.get("/:location/:price", async (req, res, next) => {
  try {
    const restaurants = await needle(
      "get",
      `${BASE_URL}search?location=${req.params.location}${req.params.price}`,
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

//GET /api/restaurants/:categories/:location
router.get("/:allCategories/:location", async (req, res, next) => {
  try {
    console.log("req.params.location", req.params.location);
    console.log("allCategories", allCategories);
    const restaurants = await needle(
      "get",
      `${BASE_URL}search?location=${req.params.location}${allCategories}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );
    const data = restaurants.body;
    console.log("DATA!", restaurants);
    res.send(data);
  } catch (err) {
    res.status(404).json({
      message: "could not find any restaurants",
      error: err.message,
    });
    next(err);
  }
});

//GET /api/restaurants/location/categories/price
router.get("/:location/:categories/:price", async (req, res, next) => {
  try {
    console.log(
      "req.params.location",
      req.params.location,
      "req.params.categories",
      req.params.categories
    );
    console.log("req.params.price", req.params.price);
    const restaurants = await needle(
      "get",
      `${BASE_URL}search?location=${req.params.location}${req.params.categories}${req.params.price}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );
    const data = restaurants.body;
    console.log("data", data);
    res.send(data);
  } catch (err) {
    res.status(404).json({
      message: "could not find any restaurants",
      error: err.message,
    });
    next(err);
  }
});

//GET https://api.yelp.com/v3/businesses/north-india-restaurant-san-francisco
//GET /api/restaurants/name-location  get specific restaurant by name
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

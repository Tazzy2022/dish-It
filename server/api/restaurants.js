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
  }
});

//GET /api/restaurants/location/price  get restaurants by location and pricing
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
  }
});

router.get("/:location/:categories", async (req, res, next) => {
  console.log("HIIIIIIII");
  try {
    console.log(
      `PATH:  ${BASE_URL}search?location=${req.params.location}${req.params.categories}`
    );
    const restaurants = await needle(
      "get",
      `${BASE_URL}search?location=${req.params.location}${req.params.categories}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );
    const data = restaurants.body;
    console.log("DATA!", data);
    res.send(data);
  } catch (err) {
    res.status(404).json({
      message: "could not find any restaurants",
      error: err.message,
    });
  }
});

//GET /api/restaurants/location/categories/price
router.get("/:location/:categories/:price", async (req, res, next) => {
  try {
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
    res.send(data);
  } catch (err) {
    res.status(404).json({
      message: "could not find any restaurants",
      error: err.message,
    });
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
  }
});
module.exports = router;

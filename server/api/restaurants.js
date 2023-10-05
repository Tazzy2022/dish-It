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
  } catch (error) {
    console.log(error);
  }
});

//GET /api/restaurants/location/categories/id
//pass categories in req.body maybe only allow one category
//multiple categories are like: &categories=chinese&categories=japanese
router.get("/location/categories/:id", async (req, res, next) => {
  try {
    const restaurants = await needle(
      "get",
      `${BASE_URL}search?location=${req.params.id}&categories=${req.body.categories}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );
    const data = restaurants.body;
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

//GET /api/restaurants/location/categories/price/id
router.get("/location/categories/price/:id", async (req, res, next) => {
  try {
    const restaurants = await needle(
      "get",
      `${BASE_URL}search?location=${req.params.id}&categories=${req.body.categories}$price=${req.body.price}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );
    const data = restaurants.body;
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

//GET https://api.yelp.com/v3/businesses/north-india-restaurant-san-francisco
//loop through req.body and split any words with "-"
//GET /api/restaurants/name/location
router.get("/name/location", async (req, res, next) => {
  try {
    const restaurant = await needle(
      "get",
      `${BASE_URL}${req.body.name}-${req.body.location}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );
    const data = restaurant.body;
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;

const BASE_URL = "https://api.yelp.com/v3/businesses/";
const router = require("express").Router();
const needle = require("needle");
require("dotenv").config();

const refactorCategories = (categories) => {
  console.log("categories in refactor function", categories);
  return categories
    .replaceAll("&", "%26")
    .replaceAll(" ", "%20")
    .replaceAll(",", "%2C");
};

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
    const loc = req.params.location
      .replaceAll(",", "%2C")
      .replaceAll(" ", "%20");
    const restaurants = await needle(
      "get",
      `${BASE_URL}search?location=${loc}${req.params.pricing}`,
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

//GET /api/restaurants/category/:categories/:location
router.get("/category/:categories/:location", async (req, res, next) => {
  const loc = req.params.location.replaceAll(",", "%2C").replaceAll(" ", "%20");
  const category = refactorCategories(req.params.categories);
  try {
    const restaurants = await needle(
      "get",
      `${BASE_URL}search?location=${loc}&term=${category}&categories=`,
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

//GET /api/restaurants/allFilters/loc/category/pricing
router.get(
  "/allFilters/:loc/:category/:pricing",
  async (req, res, next) => {
    try {
      const restaurants = await needle(
        "get",
        `${BASE_URL}search?location=${req.params.loc}&term=${req.params.category}&categories=${req.params.pricing}`,
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

//GET /api/restaurants/singleResto/:loc/:name  get specific restaurant by name
router.get("/singleResto/:loc/:name", async (req, res, next) => {
  try {
    const restaurant = await needle(
      "get",
      `${BASE_URL}search?location=${req.params.loc}&term=${req.params.name}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );
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

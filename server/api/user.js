const router = require("express").Router();
const BASE_URL = "https://api.yelp.com/v3/businesses/";
const needle = require("needle");
require("dotenv").config();
const { User, Follow, List, RestaurantNotes } = require("../db/index");

//GET "/api/user/:id/followers
router.get("/:id/followers", async (req, res, next) => {
  try {
    const allFollowers = [];
    const followers = await Follow.findAll({
      where: { userId: req.params.id },
    });
    followers.forEach((f) => {
      allFollowers.push(f.follower_id);
    });
    const result = await User.findAll({
      where: {
        id: allFollowers,
      },
    });
    res.send(result);
  } catch (err) {
    res.status(404).json({
      message: "looks like no one is following you yet",
      error: err.message,
    });
  }
});

//GET "/api/user/:id/following
router.get("/:id/following", async (req, res, next) => {
  try {
    const amFollowing = await Follow.findAll({
      where: { follower_id: req.params.id },
      include: [{ model: User }],
    });
    res.send(amFollowing);
  } catch (err) {
    res.status(404).json({
      message: "looks like you are not following anyone",
      error: err.message,
    });
  }
});

//GET "/api/user/:id/lists
router.get("/:id/lists", async (req, res, next) => {
  try {
    const lists = await List.findAll({
      where: { userId: req.params.id },
      include: [{ model: User, attributes: ["username", "imageUrl"] }],
    });
    res.send(lists);
  } catch (err) {
    res.status(404).json({
      message: "could not find lists",
      error: err.message,
    });
  }
});

//GET "/api/user/list/:id
//loop through restoArray and do api calls to yelp on each
router.get("/list/:id", async (req, res, next) => {
  try {
    const idArray = await List.findByPk(req.params.id, {
      attributes: ["restaurantIdArray", "listName", "id"],
    });
    const results = await loopThroughArray(idArray.restaurantIdArray);
    res.send(results);
  } catch (err) {
    res.status(404).json({
      message: "could not find restaurants",
      error: err.message,
    });
  }
});

//helper function to loop through restaurant array and trigger api calls
const loopThroughArray = async (idArray) => {
  try {
    const restosArray = [];
    for (let i = 0; i < idArray.length; i++) {
      const resto = await getRestosFromApi(idArray[i]);
      restosArray.push(resto);
    }
    return restosArray;
  } catch (error) {
    console.log(error);
  }
};

//api call by restaurant id
const getRestosFromApi = async (id) => {
  try {
    const resto = await needle("get", `${BASE_URL}${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    });
    return resto.body;
  } catch (error) {
    console.log(error);
  }
};

module.exports = router;

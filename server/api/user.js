const router = require("express").Router();
const BASE_URL = "https://api.yelp.com/v3/businesses/";
const needle = require("needle");
require("dotenv").config();
const { User, Follow, List, RestaurantNotes } = require("../db/index");
const Sequelize = require("sequelize");

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

//GET "/api/user/:id  find a friend to request to follow
router.get("/:id", async (req, res, next) => {
  try {
    const newFollow = await User.findOne({
      where: { email: req.params.id },
      attributes: ["username", "city", "state", "imageUrl", "email"],
    });
    res.send(newFollow);
  } catch (err) {
    res.status(404).json({
      message: "could not find lists",
      error: err.message,
    });
  }
});

//PUT "/api/user/:id  send request to follow
router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.params.id },
    });
    //need to check if they're already falling them and handle it on client
    await user.update({
      pendingFollowers: Sequelize.fn(
        "array_append",
        Sequelize.col("pendingFollowers"),
        req.body.id
      ),
    });
    res.status(200).json({ message: "your request has been sent" });
  } catch (err) {
    res.status(500).json({
      message: "could not send request",
      error: err.message,
    });
  }
});

//PUT "/api/user/:id/followers  add new follower
router.put("/:id/followers", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    const newFollower = req.body.id;
    await user.update({
      pendingFollowers: Sequelize.fn(
        "array_remove",
        Sequelize.col("pendingFollowers"),
        newFollower
      ),
    });
    await Follow.create({
      userId: req.params.id,
      follower_id: newFollower,
    });
    res.status(200).json({ message: "added new follower" });
  } catch (err) {
    res.status(500).json({
      message: "could not add that follower",
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

//POST "/api/user/:id/list  create new list
router.post("/:id/list", async (req, res, next) => {
  try {
    console.log(
      "IN SERVER",
      "userId:",
      req.params.id,
      "listName:",
      req.body
    );
    const newList = await List.create({
      userId: req.params.id,
      listName: req.body.listName,
    });
    res.send(newList);
  } catch (err) {
    res.status(500).json({
      message: "could not create new list",
      error: err.message,
    });
  }
});

//PUT "/api/user/:id/list  add restaurant to a newly created list or existing list
router.put("/:id/list", async (req, res, next) => {
  try {
    const [list, created] = await List.findOrCreate({
      where: { userId: req.body.id, listName: req.body.listName },
      defaults: req.body,
    });
    await list.update({
      restaurantIdArray: Sequelize.fn(
        "array_append",
        Sequelize.col("restaurantIdArray"),
        req.body.restaurantId
      ),
    });
    res.send(list);
  } catch (err) {
    res.status(500).json({
      message: "could not add that restaurant",
      error: err.message,
    });
  }
});

//PUT "/api/user/:id/list/restaurantNotes  update/add notes to restaurant in a user's list
router.put("/:id/list/restaurantNotes", async (req, res, next) => {
  try {
    const note = await RestaurantNotes.findOrCreate({
      where: { listId: req.body.id, restaurantId: req.body.restaurantIdArray },
      defaults: req.body,
    });
    await note.update(req.body.personalNotes);
    res.send(note);
  } catch (err) {
    res.status(500).json({
      message: "could not add that info",
      error: err.message,
    });
  }
});

//GET "/api/user/list/:id    get single user list and restaurants
//loop through restoArray and do api calls to yelp on each
router.get("/list/:id", async (req, res, next) => {
  try {
    const idArray = await List.findByPk(req.params.id, {
      attributes: ["restaurantIdArray", "listName", "id"],
    });
    const list = await loopThroughArray(idArray.restaurantIdArray);
    const notes = await RestaurantNotes.findAll({
      where: { restaurantId: idArray.restaurantIdArray },
    });
    res.send({ list, notes });
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

//DELETE "/api/user/:id/list  delete user's list
router.delete("/:id/list", async (req, res, next) => {
  try {
    const list = await List.findByPk(req.body.id);
    await list.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({
      message: "could not delete that list",
      error: err.message,
    });
  }
});

//DELETE "/api/user/:id/list/restaurant  delete restaurant from user's list
router.delete("/:id/list/restaurant", async (req, res, next) => {
  try {
    const list = await List.findByPk(req.body.id);
    await list.update({
      restaurantIdArray: Sequelize.fn(
        "array_remove",
        Sequelize.col("restaurantIdArray"),
        req.body.restaurantId
      ),
    });
    res.send(list);
  } catch (err) {
    res.status(500).json({
      message: "could not delete that restaurant",
      error: err.message,
    });
  }
});

module.exports = router;

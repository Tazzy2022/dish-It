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
      message: "looks like you haven't added any friends yet",
      error: err.message,
    });
  }
});

//GET "/api/user/:id/following
// router.get("/:id/following", async (req, res, next) => {
//   try {
//     const amFollowing = await Follow.findAll({
//       where: { follower_id: req.params.id },
//       include: [{ model: User }],
//     });
//     res.send(amFollowing);
//   } catch (err) {
//     res.status(404).json({
//       message: "looks like you are not following anyone",
//       error: err.message,
//     });
//   }
// });

//GET "/api/user/friend/:email  find a friend to request to follow
router.get("/friend/:email", async (req, res, next) => {
  try {
    const newFollow = await User.findOne({
      where: { email: req.params.email },
      attributes: ["username", "city", "state", "imageUrl", "email"],
    });
    res.send(newFollow);
  } catch (err) {
    res.status(404).json({
      message:
        "Could not find that anyone by that email. Do you want us to send them an email invite to Dish it?",
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

//PUT "/api/user/:id/:listName add restaurant to a newly created list or existing list
router.put("/:id/:listName", async (req, res, next) => {
  try {
    const restaurantId = Object.keys(req.body).toString();
    const [list, created] = await List.findOrCreate({
      where: { userId: req.params.id, listName: req.params.listName },
    });
    await list.update({
      restaurantIdArray: Sequelize.fn(
        "array_append",
        Sequelize.col("restaurantIdArray"),
        restaurantId
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

//PUT "/api/user/lists/:listId/:restaurantId  update/add notes to restaurant in a user's list
router.put("/lists/:listId/:restaurantId", async (req, res, next) => {
  try {
    const note = await RestaurantNotes.findOne({
      where: {
        listId: req.params.listId,
        restaurantId: req.params.restaurantId,
      },
    });
    if (note) {
      await note.update({ personalNotes: req.body.personalNotes });
      res.send(note);
    } else {
      const note = await RestaurantNotes.create({
        listId: req.params.listId,
        restaurantId: req.params.restaurantId,
        personalNotes: req.body.personalNotes,
      });
      res.send(note);
    }
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
    const { listName, id, restaurantIdArray } = idArray;
    if (restaurantIdArray !== null) {
      const list = await loopThroughArray(restaurantIdArray);
      const notes = await RestaurantNotes.findAll({
        where: { restaurantId: restaurantIdArray },
      });
      res.send({ listName, id, list, notes });
    } else {
      res.send({});
    }
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

//DELETE "/api/user/:list  delete user's list
router.delete("/:list", async (req, res, next) => {
  try {
    const list = await List.findByPk(req.params.list);
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
router.delete("/:listId/:restaurantId", async (req, res, next) => {
  try {
    const list = await List.findByPk(req.params.listId);
    await list.update({
      restaurantIdArray: Sequelize.fn(
        "array_remove",
        Sequelize.col("restaurantIdArray"),
        req.params.restaurantId
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

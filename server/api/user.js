const router = require("express").Router();
const BASE_URL = "https://api.yelp.com/v3/businesses/";
const needle = require("needle");
require("dotenv").config();
const { User, List, RestaurantNotes, Friend } = require("../db/index");
const Sequelize = require("sequelize");

///NEW "/api/user/:id/friends  get all friends
router.get("/:id/friends", async (req, res, next) => {
  try {
    const allFriends = [];
    const friends = await Friend.findAll({
      where: { userId: req.params.id, pending: false },
    });
    friends.forEach((f) => {
      allFriends.push(f.friendId);
    });
    const result = await User.findAll({
      where: {
        id: allFriends,
      },
      attributes: ["username", "city", "state", "email", "image"],
      // include: [{ model: Image }],
    });
    res.send(result);
  } catch (err) {
    res.status(404).json({
      message: "looks like you haven't added any friends yet",
      error: err.message,
    });
    next(err);
  }
});

//same as OG
//GET "/api/user/friend/:email  find a friend to request to follow
router.get("/friend/:email", async (req, res, next) => {
  try {
    const newFollow = await User.findOne({
      where: { email: req.params.email },
      attributes: ["username", "city", "state", "email", "image"],
      // include: [{ model: Image }],
    });
    res.send(newFollow);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//POST "/api/user/:id/friendReq send friend request to user
router.post("/:id/friendReq", async (req, res, next) => {
  try {
    const userEmail = Object.keys(req.body).toString();
    const user = await User.findOne({ where: { email: userEmail } });
    //get user to follow
    await Friend.create({
      userId: user.id,
      friendId: req.params.id,
      pending: true,
    });
    //send back my updated pending follows array as response
    res.status(201).json({ message: "your request was sent" });
  } catch (err) {
    res.status(500).json({
      message: "could not send request",
      error: err.message,
    });
    next(err);
  }
});

//GET "/api/user/:id/pendingfollowers  get all pending rcvd friend requests
router.get("/:id/pendingfollowers", async (req, res, next) => {
  try {
    const allpending = [];
    const pending = await Friend.findAll({
      where: { userId: req.params.id, pending: true },
    });
    pending.forEach((f) => {
      allpending.push(f.friendId);
    });
    const result = await User.findAll({
      where: {
        id: allpending,
      },
      attributes: ["username", "city", "state", "email", "image"],
      //  include: [{ model: Image }],
    });
    res.send(result);
  } catch (err) {
    res.status(404).json({
      message: "no pending friend requests right now",
      error: err.message,
    });
    next(err);
  }
});

//PUT  "/api/user/:id/addfriend   accept friend request from other user
router.put("/:id/addfriend", async (req, res, next) => {
  try {
    const friendEmail = Object.keys(req.body).toString();
    //adds them to the accepted user's friends list
    const friendId = await User.findOne({ where: { email: friendEmail } });
    const pendingFriend = await Friend.findOne({
      where: { userId: req.params.id, friendId: friendId.id, pending: true },
    });
    await pendingFriend.update({ pending: false });
    //adds accepted user to the friend's list (that sent request)
    await Friend.create({
      userId: friendId.id,
      friendId: req.params.id,
      pending: false,
    });
    res.status(201).json({ message: "added new friend" });
  } catch (err) {
    res.status(500).json({
      message: "could not send request",
      error: err.message,
    });
    next(err);
  }
});

//PUT (delete)  "/api/user/:id/deleteFriend   delete friend request from other user OR confirmed friend
//on one user only - other user will not know and will still show them in friends list
router.put("/:id/deleteFriend", async (req, res, next) => {
  try {
    const friendEmail = Object.keys(req.body).toString();
    const friendId = await User.findOne({ where: { email: friendEmail } });
    const friend = await Friend.findOne({
      where: { userId: req.params.id, friendId: friendId.id },
    });
    await friend.destroy();
    res.status(201).json({ message: "friend was removed from your list" });
  } catch (err) {
    res.status(500).json({
      message: "could not send request",
      error: err.message,
    });
    next(err);
  }
});

//GET "/api/user/:id/lists
router.get("/:id/lists", async (req, res, next) => {
  try {
    const lists = await List.findAll({
      where: { userId: req.params.id },
      include: [
        {
          model: User,
          attributes: ["username", "image"],
          // , include: [{ model: Image }]
        },
      ],
    });
    res.send(lists);
  } catch (err) {
    res.status(404).json({
      message: "could not find lists",
      error: err.message,
    });
    next(err);
  }
});

//GET "/api/user/friend/:friendEmail/lists
router.get("/friend/:friendEmail/lists", async (req, res, next) => {
  try {
    const friend = await User.findOne({
      where: { email: req.params.friendEmail },
    });
    const lists = await List.findAll({
      where: { userId: friend.id },
    });
    res.send(lists);
  } catch (err) {
    res.status(404).json({
      message: "could not find lists",
      error: err.message,
    });
    next(err);
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
    next(err);
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
    next(err);
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
    next(err);
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
    next(err);
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
    next(err);
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
    next(err);
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
    next(err);
  }
});

module.exports = router;

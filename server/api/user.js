const router = require("express").Router();
const BASE_URL = "https://api.yelp.com/v3/businesses/";
const needle = require("needle");
require("dotenv").config();
const { User, List, RestaurantNotes, Friend } = require("../db/index");
const Sequelize = require("sequelize");

//GET "/api/user/:id/friends  get all friends
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
    });
    const updatedFriends = updateImages(result);
    res.send(updatedFriends);
  } catch (err) {
    res.status(404).json({
      message: "looks like you haven't added any friends yet",
      error: err.message,
    });
    next(err);
  }
});

//function to update buffer images to base64 (loop)
const updateImages = (userArray) => {
  for (key of userArray) {
    if (Buffer.isBuffer(key.dataValues.image)) {
      key.dataValues.image = key.dataValues.image.toString("base64");
    }
  }
  return userArray;
};

//GET "/api/user/friend/:email  find a friend to request to follow
router.get("/friend/:email", async (req, res, next) => {
  try {
    const newFollow = await User.findOne({
      where: { email: req.params.email },
      attributes: ["username", "city", "state", "email", "image"],
    });
    if (Buffer.isBuffer(newFollow.dataValues.image)) {
      newFollow.dataValues.image =
        newFollow.dataValues.image.toString("base64");
    }
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
    });
    const pendingFriends = updateImages(result);
    res.send(pendingFriends);
  } catch (err) {
    res.status(404).json({
      message: "no pending friend requests right now",
      error: err.message,
    });
    next(err);
  }
});

//PUT  "/api/user/addfriend/:friendEmail   accept friend request from other user
router.put("/addfriend/:friendEmail", async (req, res, next) => {
  try {
    const userid = Object.keys(req.body).toString();
    //adds them to the accepted user's friends list
    const friendId = await User.findOne({
      where: { email: req.params.friendEmail },
    });
    const pendingFriend = await Friend.findOne({
      where: {
        userId: userid,
        friendId: friendId.dataValues.id,
        pending: true,
      },
    });
    await pendingFriend.update({ pending: false });
    //adds accepted user to the friend's list (that sent request)
    await Friend.create({
      userId: friendId.dataValues.id,
      friendId: userid,
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

//PUT (delete)  "/api/user/:friendEmail/deleteFriend   delete friend request from other user OR confirmed friend
//on one user only - other user will not know and will still show them in friends list
router.put("/deleteFriend/:friendEmail", async (req, res, next) => {
  try {
    const userid = Object.keys(req.body).toString();
    const friendId = await User.findOne({
      where: { email: req.params.friendEmail },
    });
    const friend = await Friend.findOne({
      where: { userId: userid, friendId: friendId.dataValues.id },
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
          attributes: ["username"],
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

//GET "/api/user/friend/lists/:friendEmail
router.get("/friend/lists/:friendEmail", async (req, res, next) => {
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

//POST "/api/user/createlist/:id  create new list
router.post("/createlist/:id", async (req, res, next) => {
  try {
    let listName;
    if (req.body.listName.includes(" ")) {
      listName = req.body.listName.split(" ").join("&");
    } else {
      listName = req.body.listName;
    }
    let image = await getImage(listName);
    if (image.length > 0) {
      res.send(
        await List.create({
          userId: req.params.id,
          listName: req.body.listName,
          image: image,
        })
      );
    }
  } catch (err) {
    res.status(500).json({
      message: "could not create new list",
      error: err.message,
    });
    next(err);
  }
});

const getImage = async (listName) => {
  try {
    const image = await needle(
      "get",
      `https://api.unsplash.com/search/photos?per=1&per_page=1&orientation=landscape&query=${listName}&client_id=${process.env.UNSPLASH_KEY}`
    );
    return image.body.results[0].urls.small;
  } catch (error) {
    console.log(error);
  }
};

//POST "/api/user/copied/:id/list  create new list
//need to find all notes associated with listname and put in array of
//objects as [ {listId: listId, restaurantId: restoId, personalNotes: ""} ]
//then when creating this list create notes based on array info
router.post("/copied/:id/:listName", async (req, res, next) => {
  try {
    let listName;
    if (req.params.listName.includes(" ")) {
      listName = req.params.listName.split(" ").join("&");
    } else {
      listName = req.params.listName;
    }
    let image = await getImage(listName);
    if (image.length > 0) {
      const newList = await List.create({
        userId: req.params.id,
        listName: req.params.listName,
        restaurantIdArray: req.body.restaurantIdArray,
        image: image,
      });

      if (req.body.restaurantNotes && newList) {
        const notes = updateRestNotes(req.body.restaurantNotes, newList.id);
        await RestaurantNotes.bulkCreate(notes);
      }
      res.send(newList);
    }
  } catch (err) {
    res.status(500).json({
      message: "could not create new list",
      error: err.message,
    });
    next(err);
  }
});

const updateRestNotes = (restoNotesArr, listId) => {
  let newNotesArr = [];
  restoNotesArr.forEach((note) => {
    newNotesArr.push({
      listId: listId,
      restaurantId: note.restaurantId,
      personalNotes: note.personalNotes,
    });
  });
  return newNotesArr;
};

//POST "/api/user/createPopList/:id/:listName create list with restaurant added
router.post("/createPopList/:id/:listName", async (req, res, next) => {
  try {
    let listName;
    if (req.params.listName.includes(" ")) {
      listName = req.params.listName.split(" ").join("&");
    } else {
      listName = req.params.listName;
    }
    let image = await getImage(listName);

    if (image.length > 0) {
      const newList = await List.create({
        userId: req.params.id,
        listName: req.params.listName,
        image: image,
      });
      if (newList) {
        await newList.update({
          restaurantIdArray: Sequelize.fn(
            "array_append",
            Sequelize.col("restaurantIdArray"),
            req.body.restaurantId
          ),
        });
        if (req.body.notes !== "empty") {
          await RestaurantNotes.create({
            listId: newList.id,
            restaurantId: req.body.restaurantId,
            personalNotes: req.body.notes,
          });
        }
      }
      res.send(newList);
    }
  } catch (err) {
    res.status(500).json({
      message: "could not add that restaurant",
      error: err.message,
    });
    next(err);
  }
});

//PUT "/api/user/:id/:listName add restaurant to existing list
router.put("/:id/:listName", async (req, res, next) => {
  console.log("req.body.notes", req.body.notes);
  try {
    const list = await List.findOne({
      where: {
        userId: req.params.id,
        listName: req.params.listName,
      },
    });
    if (
      list.restaurantIdArray !== null &&
      list.restaurantIdArray.includes(req.body.restaurantId)
    ) {
      res.status(409).json({
        message: "that restaurant is already on that list",
      });
    } else {
      await list.update({
        restaurantIdArray: Sequelize.fn(
          "array_append",
          Sequelize.col("restaurantIdArray"),
          req.body.restaurantId
        ),
      });
      if (req.body.notes !== "empty") {
        await RestaurantNotes.create({
          listId: list.id,
          restaurantId: req.body.restaurantId,
          personalNotes: req.body.notes,
        });
      }
      res.send(list);
    }
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
    console.log("req.body.personalNotes", req.body.personalNotes);
    const note = await RestaurantNotes.findOne({
      where: {
        listId: req.params.listId,
        restaurantId: req.params.restaurantId,
      },
    });
    if (note) {
      const updated = await note.update({
        personalNotes: req.body.personalNotes,
      });
      res.send(updated);
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
    if (restaurantIdArray === null) {
      res.status(204).json({
        message: "could not find restaurants",
      });
    } else {
      const list = await loopThroughArray(restaurantIdArray);
      const notes = await RestaurantNotes.findAll({
        where: { listId: req.params.id, restaurantId: restaurantIdArray },
      });
      res.send({ listName, id, list, notes });
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
    const notes = await RestaurantNotes.findAll({
      where: { listId: req.params.list },
      attributes: ["id"],
    });
    if (notes) {
      const ids = notes.map((note) => note.dataValues.id);
      await RestaurantNotes.destroy({ where: { id: ids } });
    }
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
    const note = await RestaurantNotes.findOne({
      where: {
        listId: req.params.listId,
        restaurantId: req.params.restaurantId,
      },
    });
    if (note) {
      await note.destroy();
    }
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

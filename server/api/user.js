const router = require("express").Router();
const { User, Follow, List, RestaurantNotes } = require("../db/index");
module.exports = router;

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
    console.log(err);
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
    console.log(err);
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
    console.log(err);
  }
});

const router = require("express").Router();
const { Op } = require("sequelize");
const { User, Follow } = require("../db/index");
module.exports = router;

//GET "/api/followers/user/id"
router.get("/:id", async (req, res, next) => {
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

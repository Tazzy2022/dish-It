const router = require("express").Router();
const { User, Follow } = require("../db/index");
module.exports = router;

//GET "/api/following/user/id"
router.get("/:id", async (req, res, next) => {
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

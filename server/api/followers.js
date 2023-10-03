const router = require("express").Router();
const { User, Follow } = require("../db/index");
module.exports = router;

//GET "/api/followers/user/id"
router.get("/:id", async (req, res, next) => {
  try {
    const followers = await Follow.findAll({
			where: { userId: req.params.id },
      include: [{ model: User }],
    });
    res.send(followers);
  } catch (err) {
    console.log(err);
  }
});

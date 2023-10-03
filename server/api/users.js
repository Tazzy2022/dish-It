const router = require("express").Router();
const { User, Follow } = require("../db/index");
module.exports = router;

//GET "/api/users/id"
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(user);
  } catch (ex) {
    console.log(ex);
  }
});

//GET "/api/users/id/following"
// router.get("/:id/following", async (req, res, next) => {
//   try {
//     const amFollowing = await Follow.findAll({
//       where: { follower_id: req.params.id },
//       include: [{ model: User }],
//     });
//     res.send(amFollowing);
//   } catch (err) {
//     console.log(err);
//   }
// });

//GET "/api/users/id/followers"
// router.get("/:id/followers", async (req, res, next) => {
//   try {
//     const followers = await Follow.findAll({
//       where: { userId: req.params.id },
//       include: [{ model: User }],
//     });
//     res.send(followers);
//   } catch (err) {
//     console.log(err);
//   }
// });

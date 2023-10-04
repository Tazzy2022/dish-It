const router = require("express").Router();
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
      //console.log("f is", f.follower_id);
      allFollowers.push(f.follower_id);
    });
    //followers is an array of objects need nested query
    //may need to loop through and get all follower_id
    console.log("followers!!!!", allFollowers);
    console.log("!!!!", followers);
    res.send(followers);
  } catch (err) {
    console.log(err);
  }
});

// const followers =

// SELECT User.id
// FROM User
// WHERE id IN (
//   SELECT * FROM Follow
//   WHERE Follow.userId: req.params.id
// )

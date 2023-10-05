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


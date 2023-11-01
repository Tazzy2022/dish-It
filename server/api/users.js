const router = require("express").Router();
const path = require("path");
const { User } = require("../db/index");

const assetsFolder = path.join(__dirname, "assets");

//GET "/api/users/id" get single user
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(user);
  } catch (ex) {
    res.status(404).json({
      message: "could not find user",
      error: ex.message,
    });
  }
});

//PUT "/api/users/id"  update user account info
router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(await user.update(req.body));
  } catch (ex) {
    res.status(500).json({
      message: "could not update account info",
      error: ex.message,
    });
  }
});

//PUT "/api/users/:id/avatar"  update user account info
router.put("/:id/avatar", async (req, res, next) => {
  try {
    const { avatar } = req.files;
    //avatar.mv(path.join(assetsFolder, avatar.name))

    const user = await User.findByPk(req.params.id);
    console.log("USER", user, "avatar", avatar.name);
    const updated = await user.update({
      imageUrl: avatar.name,
    });
    console.log("updated", updated);
    //res.send(await user.update(req.body));
    res.send(updated);
  } catch (ex) {
    res.status(500).json({
      message: "could not update account info",
      error: ex.message,
    });
  }
});

module.exports = router;

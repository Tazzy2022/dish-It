const router = require("express").Router();
const multer = require("multer");
const { User } = require("../db/index");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//GET "/api/users/id" get single user
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(
      req.params.id
    );
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

//POST "/api/users/avatar/:id"  update user image
router.post("/avatar/:id", upload.single("image"), async (req, res, next) => {
  try {
    const { buffer } = req.file;
    console.log("buffer", buffer);
    const user = await User.findOne({ where: { id: req.params.id } });
    if (user) {
      res.send(
        await user.update({
          image: buffer,
        })
      );
    }
  } catch (ex) {
    res.status(500).json({
      message: "could not update image",
      error: ex.message,
    });
  }
});

module.exports = router;

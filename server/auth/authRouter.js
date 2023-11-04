const authRouter = require("express").Router();
const User = require("../db/models/User");
const Image = require("../db/models/Image");

//POST '/auth/login'
authRouter.post("/login", async (req, res, next) => {
  try {
    const user = await User.authenticate(req.body, {
      include: [{ model: Image }],
    });
    res.send(user);
  } catch (err) {
    res.status(500).json({
      message: "could not login user",
      err,
    });
  }
});

//POST '/auth/signup'
authRouter.post("/signup", async (req, res, next) => {
  try {
    const user = await User.encryptUser(req.body, {
      include: [{ model: Image }],
    });
    res.send(user);
  } catch (err) {
    res.status(500).json({
      message: "could not register user",
      err,
    });
  }
});

module.exports = authRouter;

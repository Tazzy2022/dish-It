const authRouter = require("express").Router();
const User = require("../db/models/User");

//POST '/auth/login'
authRouter.post("/login", async (req, res) => {
  try {
    const user = await User.authenticate(req.body);
    return res.send(user);
  } catch (err) {
    res.status(500).json({
      message: "could not login user",
      err,
    });
  }
});

//POST '/auth/signup'
authRouter.post("/signup", async (req, res) => {
  try {
    const checkUser = await User.findOne({ where: { email: req.body.email } });
    if (checkUser) {
      return res.status(400).json({
        message:
          "that email already exists, please login or use a different email",
      });
    } else {
      const user = await User.encryptUser(req.body);
      return res.send(user);
    }
  } catch (err) {
    res.status(500).json({
      message: "could not register user",
      err,
    });
  }
});

module.exports = authRouter;

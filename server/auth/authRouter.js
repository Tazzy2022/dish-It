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
    console.log("inside POST, req.body", req.body);
    //const user = await User.create(req.body);
    // console.log("user", user);
    const user = await User.encryptUser(req.body);
    //   console.log("user in signup", user);
    return res.send(user);
  } catch (err) {
    res.status(500).json({
      message: "could not register user",
      err,
    });
  }
});

module.exports = authRouter;

//POST '/auth/login'
// authRouter.post("/login", async (req, res) => {
//   try {
//     const user = await User.authenticate(req.body);
//     return res.send(user);
//   } catch (err) {
//     res.status(500).json({
//       message: "could not login user",
//       err,
//     });
//   }
// });

//POST '/auth/signup'
// authRouter.post("/signup", async (req, res) => {
//   try {
//     console.log("inside POST, req.body", req.body);
//     const checkUser = await User.findOne({ where: { email: req.body.email } });
//     if (!checkUser) {
//       console.log("checkUser in !checkUser", checkUser);
//       const user = await User.encryptUser(req.body);
//       console.log("user in signup", user);
//       return res.send(user);
//     } else {
//       console.log("checkUser in else", checkUser);
//       return res.status(409).json({
//         message:
//           "that email already exists, please login or use a different email",
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//       message: "could not register user",
//       err,
//     });
//   }
// });

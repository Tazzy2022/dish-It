const User = require("../db/models/User");

const validateToken = async (req, res, next) => {
  try {
    console.log("req.headers.authorization", req.headers.authorization);
    const token = req.headers.authorization;
    const user = await User.validate(token);
    console.log("user in middleware", user);
    req.user = user.dataValues;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Please provide jwt in the header" });
  }
};

module.exports = validateToken;

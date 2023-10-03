const router = require("express").Router();
const validateToken = require("./middleware");

router.use("/users", validateToken, require("./users"));
router.use("/following/user", validateToken, require("./following"));
router.use("/followers/user", validateToken, require("./followers"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;

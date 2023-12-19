const router = require("express").Router();
const validateToken = require("./middleware");

// router.use("/restaurants", validateToken, require("./restaurants"));
// router.use("/users", validateToken, require("./users"));
// router.use("/user", validateToken, require("./user"));

router.use("/restaurants", require("./restaurants"));
router.use("/users", require("./users"));
router.use("/user", require("./user"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;

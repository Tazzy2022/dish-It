const router = require("express").Router();
const multer = require("multer");
//const upload = multer({ dest: "public/uploads" });
const fs = require("fs");
const path = require("path");
const { User } = require("../db/index");

// const storage = multer.diskStorage({
//   destination: (req, res, callback) => {
//     callback(null, "public/Images");
//   },
//   filename: (req, file, callback) => {
//     callback(null, Date.now() + path.extname(file.orginalname));
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: "1000000" },
//   fileFilter: (req, file, callback) => {
//     const fileTypes = /jpeg|jpg|png|gif/;
//     const mimeType = fileTypes.test(file.mimetype);
//     const extname = fileTypes.test(path.extname(file.originalname));

//     if (mimeType && extname) {
//       return callback(null, true);
//     }
//     callback("Give proper files formate to upload");
//   },
// }).single("file");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, res, callback) => {
      callback(null, "public/Images");
    },
    filename: (req, file, callback) => {
      callback(null, `${new Date().getTime()}_${file.originalname}`);
    },
  }),
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(jpeg|jpg|png|gif)$/)) {
      return callback(
        new Error(
          "only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format."
        )
      );
    }
    callback(undefined, true); // continue with upload
  },
});

//GET "/api/users/id" get single user
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id
    //   , {
    //   include: [{ model: Image }],
    // }
    );
    res.send(user);
  } catch (ex) {
    res.status(404).json({
      message: "could not find user",
      error: ex.message,
    });
  }
});

// router.get("/:id/image", async (req, res, next) => {
//   try {
//     console.log("req.params.id", req.params.id);
//     const avatar = await Image.findOne({ where: { userId: req.params.id } });
//     // res.set({
//     //   "Content-Type": avatar.file_mimetype,
//     // });
//     // res.sendFile(path.join(__dirname, "..", avatar.file_path));
//     console.log("avatar", avatar);
//     res.send(avatar);
//   } catch (ex) {
//     res.status(404).json({
//       message: "could not find user",
//       error: ex.message,
//     });
//   }
// });

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

// router.post(
//   "/:id/avatar",
//   upload.single("avatar"),
//   imageController.uploadFiles
// );

//POST "/api/users/:id/avatar"  update user account info
router.post("/:id/avatar", upload.single("file"), async (req, res, next) => {
  try {
    console.log("req.file", req.file);
    const user = await User.findOne({ where: { id: req.params.id } });
    if (user) {
      res.send(
        await user.update({
          image: req.file.path,
        })
      );
    } else {
      res.send(
        await Image.create({
          id: req.params.id,
          image: req.file.path,
        })
      );
    }
  } catch (ex) {
    res.status(500).json({
      message: "could not update account info",
      error: ex.message,
    });
  }
});

module.exports = router;

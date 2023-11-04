const path = require("path");
const multer = require("multer");
const Image = require("../models/Image");


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
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    callback(undefined, true); // continue with upload
  }
})

const uploadImage = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    const user = await Image.findOne({ where: { userId: req.params.id } });
    if (user) {
      const updated = await user.update({
        imageName: req.file.originalname,
        imageData: req.file.buffer,
      });
      res.send(updated);
    } else {
      const newImage = await Image.create({
        userId: req.params.id,
        imageName: req.file.originalname,
        imageData: req.file.buffer,
      });
      res.send(newImage);
    }
  } catch (error) {
    console.log(error);
    return res.send(`Error when uploading images: ${error}`);
  }
};

// const uploadFiles = async (req, res) => {
//   try {
//     console.log(req.file);

//     if (req.file == undefined) {
//       return res.send(`You must select a file.`);
//     }
//     const user = await Image.findOne({ where: { userId: req.params.id } });
//     if (user) {
//       const updated = await user.update({
//         imageName: req.file.originalname,
//         imageData: fs.readFileSync("Images" + req.file.filename),
//       });
//       await fs.writeFileSync("Images" + updated.imageName, updated.imageData);
//       res.send(updated);
//     } else {
//       const newImage = await Image.create({
//         userId: req.params.id,
//         imageName: req.file.originalname,
//         imageData: fs.readFileSync("Images" + req.file.filename),
//       });
//       await fs.writeFileSync("Images" + newImage.imageName, newImage.imageData);
//       res.send(newImage);
//     }
//     await Image;
//   } catch (error) {
//     console.log(error);
//     return res.send(`Error when uploading images: ${error}`);
//   }
// };

module.exports = {
  uploadImage,
  upload,
};

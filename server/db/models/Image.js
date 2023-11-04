const Sequelize = require("sequelize");
const { UUID, UUIDV4, STRING, BLOB } = Sequelize;
const db = require("../db");

const Image = db.define("image", {
  title: {
    type: STRING,
  },
  file_path: {
    type: STRING,
  },
  file_mimetype: {
    type: STRING,
  },
});

module.exports = Image;

const Sequelize = require("sequelize");
const { BOOLEAN } = Sequelize;
const db = require("../db");

const Friend = db.define("friend", {
  pending: {
    type: BOOLEAN,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Friend;

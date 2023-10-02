const Sequelize = require("sequelize");
const { UUID, UUIDV4 } = Sequelize;
const db = require("../db");

const Follow = db.define("follow", {
  follower_id: {
    type: UUID,
    defaultValue: UUIDV4,
  },
});

module.exports = Follow;

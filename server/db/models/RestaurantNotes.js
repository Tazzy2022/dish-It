const Sequelize = require("sequelize");
const { UUID, UUIDV4, STRING } = Sequelize;
const db = require("../db");

const RestaurantNotes = db.define("restaurantNotes", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  restaurantId: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  personalNotes: {
    type: STRING,
  },
  leaderNotes: {
    type: STRING,
  },
});

module.exports = RestaurantNotes;

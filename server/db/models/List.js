const Sequelize = require("sequelize");
const { UUID, UUIDV4, STRING, BOOLEAN, ARRAY } = Sequelize;
const db = require("../db");

const List = db.define("list", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  listName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isPersonal: {
    type: BOOLEAN,
    defaultValue: true,
  },
  isPrivate: {
    type: BOOLEAN,
    defaultValue: false,
  },
  image: {
    type: STRING,
    defaultValue:
      "https://image.shutterstock.com/image-photo/healthy-food-clean-eating-selection-260nw-722718097.jpg",
  },
  // restaurantIdArray: {
  //   type: STRING,
  //   get allIds() {
  //     return this.getDataValue();
  //   },
  //   set id(value) {
  //     this.setDataValue(value);
  //   },
  // },
  //OR:
  restaurantIdArray: {
    type: ARRAY(Sequelize.STRING),
    defaultValue: null,
  },
});

module.exports = List;

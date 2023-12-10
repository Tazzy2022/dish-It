const db = require("./db");
const User = require("./models/User");
const List = require("./models/List");
const RestaurantNotes = require("./models/RestaurantNotes");
const Friend = require("./models/Friend");
const Image = require("./models/Image")

User.hasMany(List);
List.belongsTo(User);
List.hasMany(RestaurantNotes);
RestaurantNotes.belongsTo(List);
Friend.belongsTo(User);
User.hasMany(Friend, { foreignKey: "friendId" });

module.exports = {
  db,
  User,
  RestaurantNotes,
  List,
  Friend,
};

//this is the access point for all things database related!

const db = require("./db");
const Follow = require("./models/Follow");
const User = require("./models/User");
const List = require("./models/List");
const RestaurantNotes = require("./models/RestaurantNotes");

User.hasMany(List);
List.belongsTo(User);
User.hasMany(Follow);
Follow.belongsTo(User);
List.hasMany(RestaurantNotes);
RestaurantNotes.belongsTo(List);

module.exports = {
  db,
  User,
  RestaurantNotes,
  List,
  Follow,
};

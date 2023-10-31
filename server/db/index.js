const db = require("./db");
const Follow = require("./models/Follow");
const User = require("./models/User");
const List = require("./models/List");
const RestaurantNotes = require("./models/RestaurantNotes");
const Friend = require("./models/Friend");

User.hasMany(List);
Follow.belongsTo(User);
User.hasMany(Follow, { foreignKey: "follower_id" });
List.belongsTo(User);
List.hasMany(RestaurantNotes);
RestaurantNotes.belongsTo(List);
Friend.belongsTo(User)
User.hasMany(Friend, { foreignKey: "friendId" })
//User.hasMany(Friend)

module.exports = {
  db,
  User,
  RestaurantNotes,
  List,
  Follow,
  Friend
};

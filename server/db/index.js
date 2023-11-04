const db = require("./db");
//const Follow = require("./models/Follow");
const User = require("./models/User");
const List = require("./models/List");
const RestaurantNotes = require("./models/RestaurantNotes");
const Friend = require("./models/Friend");
const Image = require("./models/Image")

User.hasMany(List);
// Follow.belongsTo(User);
// User.hasMany(Follow, { foreignKey: "follower_id" });
List.belongsTo(User);
List.hasMany(RestaurantNotes);
RestaurantNotes.belongsTo(List);
Friend.belongsTo(User);
User.hasMany(Friend, { foreignKey: "friendId" });
User.hasOne(Image)
Image.belongsTo(User)

module.exports = {
  db,
  User,
  RestaurantNotes,
  List,
  Friend,
  Image
};

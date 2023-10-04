const Sequelize = require("sequelize");
const { STRING } = Sequelize;
const db = require("../db");

const Profile = db.define(
  "profile",
  {
    username: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    city: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    state: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    imageUrl: {
      type: STRING,
      defaultValue:
        "https://images.getbento.com/accounts/fa5a0ad193d9db0f760b62a4b1633afd/media/images/46877Avocado_Toast_by_Kimberly_Park_2.jpeg?w=1000&fit=max&auto=compress,format&h=1000",
    },
  },
);

module.exports = Profile

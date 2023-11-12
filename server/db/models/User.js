const Sequelize = require("sequelize");
const { UUID, UUIDV4, STRING, BLOB } = Sequelize;
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = db.define(
  "user",
  {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    email: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      unique: true,
    },
    password: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
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
    image: {
      type: STRING,
    },
  },
  {
    hooks: {
      async beforeCreate(user) {
        const newUser = user.dataValues;
        newUser.password = await bcrypt.hash(
          newUser.password,
          parseInt(process.env.ROUNDS)
        );
      },
    },
  }
);

/* generate token function
returns a signed jwt using the environment secret
*/
User.generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
    }, //this payload will be in token (encrypted)
    process.env.JWT_SECRET
  );
};

//returns a jwt token for the created user
User.encryptUser = async (user) => {
  const { dataValues } = await User.create(user);
  //return the jwt and the newly created user
  return {
    user: dataValues,
    token: User.generateToken(dataValues),
  };
};

// User.prototype.correctPassword = function (candidatePwd) {
//   //we need to compare the plain version to an encrypted version of the password
//   return bcrypt.compare(candidatePwd, this.password);
// };

User.authenticate = async function ({ email, password }) {
  const user = await User.findOne({ where: { email: email } });
  if (user && (await bcrypt.compare(password, user.dataValues.password))) {
    return {
      user,
      token: User.generateToken(user),
    };
  } else {
    const error = Error("bad credentials");
    error.status = 401;
    console.log(error);
  }
};

User.validate = async (token) => {
  try {
    const { userId } = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(userId);
    if (user) {
      return user;
    }
    const error = Error("bad credentials");
    error.status = 401;
    throw error;
  } catch (err) {
    const error = Error("bad credentials");
    error.status = 401;
    throw (error, err);
  }
};

// User.addHook("beforeSave", async (user) => {
//   if (user.changed("password")) {
//     user.password = await bcrypt.hash(user.password, 5);
//   }
// });

/**
 * hooks
 */
// const hashPassword = async (user) => {
//   //in case the password has been changed, we want to encrypt it with bcrypt
//   if (user.changed("password")) {
//     user.password = await bcrypt.hash(user.password, parseInt(process.env.ROUNDS));
//   }
// };

// User.beforeCreate(hashPassword);
// User.beforeUpdate(hashPassword);
// User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));

module.exports = User;

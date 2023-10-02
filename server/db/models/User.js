const Sequelize = require("sequelize");
const { UUID, UUIDV4, STRING } = Sequelize;
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
    username: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
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
  //create user
  const { dataValues } = await User.create(user);
  //return the jwt for the newly created user
  return User.generateToken(dataValues);
};

// User.prototype.correctPassword = function (candidatePwd) {
//   //we need to compare the plain version to an encrypted version of the password
//   return bcrypt.compare(candidatePwd, this.password);
// };

User.authenticate = async function ({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  } else if (user && (await bcrypt.compare(password, user.password))) {
    return {
      user,
      token: User.generateToken(user),
    };
  } else {
    const error = Error("bad credentials");
    error.status = 401;
    throw error;
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

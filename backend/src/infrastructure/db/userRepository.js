const initUserModel = require("../models/User.model");
const { sequelize } = require("./mysqlClient");
const User = require("../../domain/entities/User");

const UserModel = initUserModel(sequelize);

async function upsertUser(auth0Id, email, name) {
  let user = await UserModel.findOne({ where: { auth0Id } });
  if (!user) {
    user = await UserModel.create({ auth0Id, email, name });
  } else {
    let needsUpdate = false;
    if (user.email !== email) {
      user.email = email;
      needsUpdate = true;
    }
    if (name && user.name !== name) {
      user.name = name;
      needsUpdate = true;
    }
    if (needsUpdate) await user.save();
  }
  return new User({ id: user.id.toString(), email: user.email, name: user.name });
}

async function findUserById(id) {
  const user = await UserModel.findByPk(Number(id));
  if (!user) return null;
  return new User({ id: user.id.toString(), email: user.email, name: user.name });
}

module.exports = { upsertUser, findUserById };

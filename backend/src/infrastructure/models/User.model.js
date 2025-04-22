const { Model, DataTypes } = require("sequelize");

class UserModel extends Model {}

function initUserModel(sequelize) {
  UserModel.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      auth0Id: { type: DataTypes.STRING, unique: true, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      paranoid: true
    }
  );
  return UserModel;
}

module.exports = initUserModel;

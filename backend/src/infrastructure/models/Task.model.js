const { Model, DataTypes } = require("sequelize");

class TaskModel extends Model {}

function initTaskModel(sequelize) {
  TaskModel.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      completed: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "Task",
      tableName: "tasks",
      timestamps: true,
      paranoid: true
    }
  );
  return TaskModel;
}

module.exports = initTaskModel;

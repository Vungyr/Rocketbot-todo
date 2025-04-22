const initTaskModel = require("../models/Task.model");
const { sequelize } = require("./mysqlClient");
const Task = require("../../domain/entities/Task");

const TaskModel = initTaskModel(sequelize);

async function createTask(userId, title) {
  const task = await TaskModel.create({ userId: Number(userId), title });
  return new Task({ id: task.id.toString(), userId: task.userId.toString(), title: task.title, completed: task.completed });
}

async function getTasksByUser(userId) {
  const tasks = await TaskModel.findAll({ where: { userId: Number(userId) } });
  return tasks.map(t => new Task({ id: t.id.toString(), userId: t.userId.toString(), title: t.title, completed: t.completed }));
}

async function updateTask(userId, taskId, data) {
  const task = await TaskModel.findOne({ where: { id: Number(taskId), userId: Number(userId) } });
  if (!task) return null;
  await task.update(data);
  return new Task({ id: task.id.toString(), userId: task.userId.toString(), title: task.title, completed: task.completed });
}

async function deleteTask(userId, taskId) {
  const deletedCount = await TaskModel.destroy({ where: { id: Number(taskId), userId: Number(userId) } });
  return deletedCount === 1;
}

module.exports = { createTask, getTasksByUser, updateTask, deleteTask };

const taskRepo = require("../infrastructure/db/taskRepository");
const AppError = require("../domain/errors/AppError");

async function createTask(userId, title) {
  if (!title) throw AppError.badRequest("Title is required");
  return taskRepo.createTask(userId, title);
}

async function listTasks(userId) {
  return taskRepo.getTasksByUser(userId);
}

async function updateTask(userId, taskId, data) {
  const task = await taskRepo.updateTask(userId, taskId, data);
  if (!task) throw AppError.notFound("Task not found or not owned by user");
  return task;
}

async function deleteTask(userId, taskId) {
  const deleted = await taskRepo.deleteTask(userId, taskId);
  if (!deleted) throw AppError.notFound("Task not found or not owned by user");
}

module.exports = { createTask, listTasks, updateTask, deleteTask };

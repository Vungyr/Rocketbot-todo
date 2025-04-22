const taskUseCases = require("../usecases/taskUseCases");

async function createTask(req, res, next) {
  try {
    const userId = req.user.id;
    const { title } = req.body;
    const task = await taskUseCases.createTask(userId, title);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

async function listTasks(req, res, next) {
  try {
    const userId = req.user.id;
    const tasks = await taskUseCases.listTasks(userId);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

async function updateTask(req, res, next) {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;
    const data = req.body;
    const task = await taskUseCases.updateTask(userId, taskId, data);
    res.json(task);
  } catch (err) {
    next(err);
  }
}

async function deleteTask(req, res, next) {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;
    await taskUseCases.deleteTask(userId, taskId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { createTask, listTasks, updateTask, deleteTask };

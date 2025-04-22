const taskUseCase = require('../src/usecases/taskUseCases');
const taskRepo = require('../src/infrastructure/db/taskRepository');
const AppError = require('../src/domain/errors/AppError');

jest.mock('../src/infrastructure/db/taskRepository');

describe('Task Use Case', () => {
  const userId = 1;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createTask', () => {
    it('debería crear una tarea correctamente', async () => {
      taskRepo.createTask.mockResolvedValue({ id: 123, userId, title: 'Test task' });

      const result = await taskUseCase.createTask(userId, 'Test task');

      expect(taskRepo.createTask).toHaveBeenCalledWith(userId, 'Test task');
      expect(result).toEqual({ id: 123, userId, title: 'Test task' });
    });

    it('debería lanzar error si no se provee título', async () => {
      await expect(taskUseCase.createTask(userId, '')).rejects.toThrow(AppError);
      await expect(taskUseCase.createTask(userId, '')).rejects.toMatchObject({ statusCode: 400 });
    });
  });

  describe('listTasks', () => {
    it('debería devolver la lista de tareas del usuario', async () => {
      const tasks = [{ id: 1, title: 'Task 1' }, { id: 2, title: 'Task 2' }];
      taskRepo.getTasksByUser.mockResolvedValue(tasks);

      const result = await taskUseCase.listTasks(userId);

      expect(taskRepo.getTasksByUser).toHaveBeenCalledWith(userId);
      expect(result).toEqual(tasks);
    });
  });

  describe('updateTask', () => {
    it('debería actualizar la tarea correctamente', async () => {
      const updatedTask = { id: 1, title: 'Updated task' };
      taskRepo.updateTask.mockResolvedValue(updatedTask);

      const result = await taskUseCase.updateTask(userId, 1, { title: 'Updated task' });

      expect(taskRepo.updateTask).toHaveBeenCalledWith(userId, 1, { title: 'Updated task' });
      expect(result).toEqual(updatedTask);
    });

    it('debería lanzar error si la tarea no existe o no pertenece al usuario', async () => {
      taskRepo.updateTask.mockResolvedValue(null);

      await expect(taskUseCase.updateTask(userId, 999, { title: 'New title' })).rejects.toThrow(AppError);
      await expect(taskUseCase.updateTask(userId, 999, { title: 'New title' })).rejects.toMatchObject({ statusCode: 404 });
    });
  });

  describe('deleteTask', () => {
    it('debería eliminar la tarea correctamente', async () => {
      taskRepo.deleteTask.mockResolvedValue(true);

      await expect(taskUseCase.deleteTask(userId, 1)).resolves.toBeUndefined();
      expect(taskRepo.deleteTask).toHaveBeenCalledWith(userId, 1);
    });

    it('debería lanzar error si la tarea no existe o no pertenece al usuario', async () => {
      taskRepo.deleteTask.mockResolvedValue(false);

      await expect(taskUseCase.deleteTask(userId, 999)).rejects.toThrow(AppError);
      await expect(taskUseCase.deleteTask(userId, 999)).rejects.toMatchObject({ statusCode: 404 });
    });
  });
});

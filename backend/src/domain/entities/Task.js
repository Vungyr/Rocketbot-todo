// Task entity
module.exports = class Task {
    constructor({ id, userId, title, completed }) {
      this.id = id;
      this.userId = userId;
      this.title = title;
      this.completed = completed;
    }
  };
  
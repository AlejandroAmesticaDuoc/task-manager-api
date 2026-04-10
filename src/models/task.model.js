let tasks = [];
let nextId = 1;

class TaskModel {
  static getAll() {
    return tasks;
  }

  static getById(id) {
    return tasks.find((task) => task.id === id);
  }

  static create({ title, description = "", status = "pending" }) {
    const task = {
      id: nextId++,
      title,
      description,
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tasks.push(task);
    return task;
  }

  static update(id, data) {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) return null;

    tasks[index] = {
      ...tasks[index],
      ...data,
      id,
      updatedAt: new Date().toISOString(),
    };
    return tasks[index];
  }

  static delete(id) {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  }

  static reset() {
    tasks = [];
    nextId = 1;
  }
}

module.exports = TaskModel;

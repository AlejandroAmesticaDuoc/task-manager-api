const TaskModel = require("../models/task.model");

const getAllTasks = (req, res) => {
  let tasks = TaskModel.getAll();
  const { status } = req.query;
  if (status) {
    tasks = tasks.filter((task) => task.status === status);
  }
  res.json({ success: true, data: tasks });
};

const getTaskById = (req, res) => {
  const task = TaskModel.getById(parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }
  res.json({ success: true, data: task });
};

const createTask = (req, res) => {
  const { title, description, status } = req.body;
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  }
  const task = TaskModel.create({ title, description, status });
  res.status(201).json({ success: true, data: task });
};

const updateTask = (req, res) => {
  const task = TaskModel.update(parseInt(req.params.id), req.body);
  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }
  res.json({ success: true, data: task });
};

const deleteTask = (req, res) => {
  const deleted = TaskModel.delete(parseInt(req.params.id));
  if (!deleted) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }
  res.json({ success: true, message: "Task deleted" });
};

const getTaskCount = (req, res) => {
  const tasks = TaskModel.getAll();
  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === "pending").length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  res.json({ success: true, data: { total, pending, completed } });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskCount,
};

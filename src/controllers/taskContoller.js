
const Task = require('../models/taskModel');

// Create a new task
exports.createTask = async (req, res) => {
    try {
      const { title, description } = req.body;
      if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'Task title cannot be empty' });
      }
      const task = new Task({ title, description });
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Error creating task', details: error.message });
    }
  };
  
  // Get all tasks
  exports.getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching tasks', details: error.message });
    }
  };
  
  // Mark a task as completed
  exports.markTaskAsCompleted = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      if (task.isCompleted) {
        return res.status(400).json({ error: 'Task is already marked as completed' });
      }
      task.isCompleted = true;
      await task.save();
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Error updating task', details: error.message });
    }
  };
  
  // Edit a task
  exports.editTask = async (req, res) => {
    try {
      const { title, description } = req.body;
      if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'Task title cannot be empty' });
      }
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        { title, description },
        { new: true, runValidators: true } // Run Mongoose validation
      );
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Error updating task', details: error.message });
    }
  };
  
  // Delete a task
  exports.deleteTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting task', details: error.message });
    }
  };
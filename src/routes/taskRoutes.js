const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskContoller');

// Define task routes
router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.patch('/:id/complete', taskController.markTaskAsCompleted);
router.put('/:id', taskController.editTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;

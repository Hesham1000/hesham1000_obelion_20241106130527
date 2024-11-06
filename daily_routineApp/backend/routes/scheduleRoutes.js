const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

router.get('/tasks', scheduleController.getTasks);

router.post('/tasks', scheduleController.addTask);

router.put('/tasks/:taskId', scheduleController.toggleTaskCompletion);

router.delete('/tasks/:taskId', scheduleController.deleteTask);

module.exports = router;
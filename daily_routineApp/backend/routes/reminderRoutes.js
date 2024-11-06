const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');

router.get('/reminders', reminderController.getAllReminders);

router.post('/reminders', reminderController.addReminder);

router.put('/reminders/:id', reminderController.editReminder);

router.delete('/reminders/:id', reminderController.deleteReminder);

module.exports = router;

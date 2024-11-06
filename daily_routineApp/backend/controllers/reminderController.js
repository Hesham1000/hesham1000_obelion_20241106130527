const Reminder = require('../models/Reminder');

// Get all reminders
exports.getAllReminders = async (req, res) => {
    try {
        const reminders = await Reminder.findAll();
        res.json(reminders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reminders' });
    }
};

// Add a new reminder
exports.addReminder = async (req, res) => {
    const { task, reminderTime } = req.body;
    try {
        const newReminder = await Reminder.create({ task, reminderTime });
        res.status(201).json(newReminder);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add reminder' });
    }
};

// Edit an existing reminder
exports.editReminder = async (req, res) => {
    const { id } = req.params;
    const { task, reminderTime } = req.body;
    try {
        const reminder = await Reminder.findByPk(id);
        if (reminder) {
            reminder.task = task;
            reminder.reminderTime = reminderTime;
            await reminder.save();
            res.json(reminder);
        } else {
            res.status(404).json({ error: 'Reminder not found' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Failed to edit reminder' });
    }
};

// Delete a reminder
exports.deleteReminder = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Reminder.destroy({ where: { id } });
        if (deleted) {
            res.json({ message: 'Reminder deleted' });
        } else {
            res.status(404).json({ error: 'Reminder not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete reminder' });
    }
};

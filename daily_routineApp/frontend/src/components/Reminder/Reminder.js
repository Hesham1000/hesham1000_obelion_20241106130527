import React, { useState, useEffect } from 'react';
import './Reminder.css';
import axios from 'axios';

function Reminder() {
    const [task, setTask] = useState('');
    const [reminderTime, setReminderTime] = useState('');
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
        fetchReminders();
    }, []);

    const fetchReminders = async () => {
        try {
            const response = await axios.get('https://daily-routineapp-backend.cloud-stacks.com/api/reminders');
            setReminders(response.data);
        } catch (error) {
            alert('Failed to fetch reminders');
        }
    };

    const handleAddReminder = async () => {
        if (task && reminderTime) {
            try {
                const response = await axios.post('https://daily-routineapp-backend.cloud-stacks.com/api/reminders', {
                    task,
                    reminderTime
                });
                setReminders([...reminders, response.data]);
                setTask('');
                setReminderTime('');
            } catch (error) {
                alert('Failed to add reminder');
            }
        }
    };

    const handleEditReminder = (id) => {
        const reminderToEdit = reminders.find(reminder => reminder.id === id);
        if (reminderToEdit) {
            setTask(reminderToEdit.task);
            setReminderTime(reminderToEdit.reminderTime);
            handleDeleteReminder(id);
        }
    };

    const handleDeleteReminder = async (id) => {
        try {
            await axios.delete(`https://daily-routineapp-backend.cloud-stacks.com/api/reminders/${id}`);
            const updatedReminders = reminders.filter(reminder => reminder.id !== id);
            setReminders(updatedReminders);
        } catch (error) {
            alert('Failed to delete reminder');
        }
    };

    return (
        <div className="reminder-container">
            <header className="reminder-header">
                <h1>Set Reminders</h1>
            </header>
            <main className="reminder-main">
                <div className="reminder-form">
                    <input
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        placeholder="Enter task"
                    />
                    <input
                        type="datetime-local"
                        value={reminderTime}
                        onChange={(e) => setReminderTime(e.target.value)}
                    />
                    <button onClick={handleAddReminder}>Add Reminder</button>
                </div>
                <ul className="reminder-list">
                    {reminders.map(reminder => (
                        <li key={reminder.id}>
                            <span>{reminder.task} - {new Date(reminder.reminderTime).toLocaleString()}</span>
                            <button onClick={() => handleEditReminder(reminder.id)}>Edit</button>
                            <button onClick={() => handleDeleteReminder(reminder.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </main>
            <footer className="reminder-footer">
                <p>© 2023 Daily Routine App</p>
            </footer>
        </div>
    );
}

export default Reminder;

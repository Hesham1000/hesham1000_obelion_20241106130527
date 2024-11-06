import React, { useState, useEffect } from 'react';
import './Schedule.css';
import axios from 'axios';

const Schedule = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://daily-routineapp-backend.cloud-stacks.com/api/tasks');
        setTasks(response.data);
      } catch (error) {
        alert('Failed to retrieve tasks');
      }
    };
    fetchTasks();
  }, []);

  const toggleComplete = async (taskId) => {
    try {
      const response = await axios.put(`https://daily-routineapp-backend.cloud-stacks.com/api/tasks/${taskId}`);
      setTasks(tasks.map(task => (task.id === taskId ? response.data : task)));
    } catch (error) {
      alert('Failed to update task');
    }
  };

  const addTask = async () => {
    const newTask = { title: 'New Task', description: 'Description for New Task' };
    try {
      const response = await axios.post('https://daily-routineapp-backend.cloud-stacks.com/api/tasks', newTask, {
        headers: { 'Content-Type': 'application/json' },
      });
      setTasks([...tasks, response.data]);
    } catch (error) {
      alert('Failed to create task');
    }
  };

  return (
    <div className="schedule">
      <header className="schedule-header">
        <h1>View Daily Schedule</h1>
      </header>
      <nav className="schedule-nav">
        <ul>
          <li>Tasks</li>
          <li>Completed</li>
          <li>Pending</li>
        </ul>
      </nav>
      <main className="schedule-main">
        {tasks.sort((a, b) => a.id - b.id).map(task => (
          <div key={task.id} className="task">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <div className="task-details">
              <h2>{task.title}</h2>
              <p>{task.description}</p>
            </div>
          </div>
        ))}
      </main>
      <aside className="schedule-links">
        <a href="#">Help</a>
        <a href="#">More Info</a>
      </aside>
      <button className="add-task-button" onClick={addTask}>
        Add Task
      </button>
      <footer className="schedule-footer">
        <p>&copy; 2023 Daily Routine App</p>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </footer>
    </div>
  );
};

export default Schedule;

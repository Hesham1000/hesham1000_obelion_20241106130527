import React from 'react';
import Login from './components/Login/Login.js';
import Schedule from './components/Schedule/Schedule.js';
import Reminder from './components/Reminder/Reminder.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My App</h1>
      </header>
      <main>
        <Login />
        <Schedule />
        <Reminder />
      </main>
      <footer>
        <p>© 2023 My App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

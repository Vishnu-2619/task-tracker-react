// React Task Tracker with Full Edit Mode: Title, Description, Priority, Due Date

import React, { useState, useEffect } from 'react';
import './styles/App.css';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [loginInput, setLoginInput] = useState('');
  const [myTasks, setMyTasks] = useState([]);
  const [taskFilter, setTaskFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editPriority, setEditPriority] = useState('Low');
  const [editDueDate, setEditDueDate] = useState('');

  useEffect(() => {
    if (username) {
      const savedTasks = JSON.parse(localStorage.getItem(`tasks_${username}`)) || [];
      setMyTasks(savedTasks);
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      localStorage.setItem(`tasks_${username}`, JSON.stringify(myTasks));
    }
  }, [myTasks, username]);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const filteredTasks = myTasks.filter(task => {
    const matchesFilter = taskFilter === 'All' ? true : taskFilter === 'Completed' ? task.completed : !task.completed;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const addTask = (title, desc, priority, dueDate) => {
    setMyTasks([...myTasks, {
      id: Date.now(),
      title,
      description: desc,
      completed: false,
      createdAt: new Date().toISOString(),
      priority,
      dueDate
    }]);
  };

  const toggleComplete = (id) => {
    setMyTasks(myTasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    if (window.confirm('Delete this task?')) {
      setMyTasks(myTasks.filter(task => task.id !== id));
    }
  };

  const startEdit = (task) => {
    setEditTaskId(task.id);
    setEditTitle(task.title);
    setEditDesc(task.description);
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate);
  };

  const saveEdit = (id) => {
    setMyTasks(myTasks.map(task =>
      task.id === id ? {
        ...task,
        title: editTitle,
        description: editDesc,
        priority: editPriority,
        dueDate: editDueDate
      } : task
    ));
    setEditTaskId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    window.location.reload();
  };

  if (!username) {
    return (
      <div className="App">
        <h2>Login</h2>
        <input
          placeholder="Enter Username"
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
        />
        <button
          onClick={() => {
            if (loginInput.trim().length < 3) {
              alert('Username must be at least 3 characters long');
              return;
            }
            localStorage.setItem('username', loginInput);
            setUsername(loginInput);
          }}
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <h2>Welcome, {username}</h2>
      <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
      <button onClick={handleLogout}>Logout</button>
      <input
        placeholder="Search Tasks"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TaskForm addTask={addTask} />

      <div className="filter-btns">
        <button onClick={() => setTaskFilter('All')}>All ({myTasks.length})</button>
        <button onClick={() => setTaskFilter('Completed')}>Completed ({myTasks.filter(t => t.completed).length})</button>
        <button onClick={() => setTaskFilter('Pending')}>Pending ({myTasks.filter(t => !t.completed).length})</button>
      </div>

      {filteredTasks.map(task => (
        <div key={task.id} className={`task ${task.completed ? 'done' : ''} priority-${task.priority.toLowerCase()}`}>
          {editTaskId === task.id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <input
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
              />
              <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <input
                type="date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
              />
              <button onClick={() => saveEdit(task.id)}>Save</button>
            </>
          ) : (
            <>
              <h4>{task.title} ({task.priority})</h4>
              <p>{task.description}</p>
              <small>Due: {task.dueDate || 'N/A'}</small><br />
              <small>Created: {new Date(task.createdAt).toLocaleString()}</small>
            </>
          )}

          <div>
            <button onClick={() => toggleComplete(task.id)}>
              {task.completed ? 'Mark Pending' : 'Mark Complete'}
            </button>
            <button onClick={() => startEdit(task)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function TaskForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title, desc, priority, dueDate);
      setTitle('');
      setDesc('');
      setPriority('Low');
      setDueDate('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default App;

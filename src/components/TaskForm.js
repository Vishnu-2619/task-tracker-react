import React, { useState } from 'react';

function TaskForm({ setTasks }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      setTasks(prev => [...prev, { id: Date.now(), title, description: desc, completed: false, createdAt: new Date().toISOString() }]);
      setTitle('');
      setDesc('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Description (optional)" value={desc} onChange={(e) => setDesc(e.target.value)} />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
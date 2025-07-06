import React from 'react';

function TaskItem({ task, setTasks, tasks }) {
  const toggleComplete = () => {
    setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = () => {
    if (window.confirm('Delete this task?')) {
      setTasks(tasks.filter(t => t.id !== task.id));
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <h4>{task.title}</h4>
      {task.description && <p>{task.description}</p>}
      <small>Created: {new Date(task.createdAt).toLocaleString()}</small>
      <div>
        <button onClick={toggleComplete}>{task.completed ? 'Mark Pending' : 'Mark Complete'}</button>
        <button onClick={deleteTask}>Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;
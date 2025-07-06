import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import TaskFilter from './TaskFilter';

function TaskList({ username }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter(task =>
    filter === 'All' ? true :
    filter === 'Completed' ? task.completed :
    !task.completed
  );

  return (
    <div className="task-list">
      <h2>Hi {username}, Manage Your Tasks</h2>
      <TaskForm setTasks={setTasks} />
      <TaskFilter filter={filter} setFilter={setFilter} tasks={tasks} />
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} setTasks={setTasks} tasks={tasks} />
      ))}
    </div>
  );
}

export default TaskList;
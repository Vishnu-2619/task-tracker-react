import React from 'react';

function TaskFilter({ filter, setFilter, tasks }) {
  const count = (status) =>
    status === 'All' ? tasks.length :
    status === 'Completed' ? tasks.filter(t => t.completed).length :
    tasks.filter(t => !t.completed).length;

  return (
    <div className="task-filter">
      <button onClick={() => setFilter('All')} className={filter === 'All' ? 'active' : ''}>All ({count('All')})</button>
      <button onClick={() => setFilter('Completed')} className={filter === 'Completed' ? 'active' : ''}>Completed ({count('Completed')})</button>
      <button onClick={() => setFilter('Pending')} className={filter === 'Pending' ? 'active' : ''}>Pending ({count('Pending')})</button>
    </div>
  );
}

export default TaskFilter;
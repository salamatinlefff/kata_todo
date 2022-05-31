import React from 'react';
import Task from '../task/task';

export default function TaskList({ tasks }) {
  const selectClass = ({ completed, editing }) => {
    if (completed) return 'completed';
    if (editing) return 'editing';

    return '';
  };

  return (
    <ul className='todo-list'>
      {tasks.map(({ id, description, timeCreated, completed, editing }) => {
        const currentClass = selectClass({ completed, editing });
        return (
          <li key={id} className={currentClass}>
            <Task
              description={description}
              timeCreated={timeCreated}
              classEditing={currentClass === 'editing'}
            />
          </li>
        );
      })}
    </ul>
  );
}

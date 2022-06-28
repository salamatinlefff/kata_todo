import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';

const TaskListItem = (props) => {
  const {
    id,
    description,
    timeCreated,
    completed,
    editing,
    editTodoInputValue,
    onDeleteTodo,
    onToggleCompleted,
    onActiveEdited,
    onChangeEditInput,
    onCancelInputEdit,
    onSubmitEdited,
  } = props;

  let currentClass = '';
  if (completed) currentClass += ' completed';
  if (editing) currentClass += ' editing';

  return (
    <li className={currentClass}>
      <div className='view'>
        <input
          className='toggle'
          type='checkbox'
          onChange={() => onToggleCompleted(id)}
          checked={completed}
        />

        <label>
          <span className='description' onClick={() => onToggleCompleted(id)}>
            {description}
          </span>
          <span className='created'>
            created{' '}
            {formatDistanceToNow(new Date(timeCreated), {
              addSuffix: true,
              includeSeconds: true,
            })}
          </span>
        </label>

        <button
          className='icon icon-edit'
          onClick={() => onActiveEdited(id, description)}
        ></button>
        <button
          className='icon icon-destroy'
          onClick={() => onDeleteTodo(id)}
        ></button>
      </div>
      {editing && (
        <form style={{ margin: 0 }} onSubmit={onSubmitEdited(id)}>
          <input
            type='text'
            className='edit'
            value={editTodoInputValue}
            autoFocus={true}
            onKeyUp={onCancelInputEdit(id)}
            onChange={onChangeEditInput}
          />
        </form>
      )}
    </li>
  );
};

TaskListItem.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  timeCreated: PropTypes.object.isRequired,
  completed: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  editTodoInputValue: PropTypes.string.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onActiveEdited: PropTypes.func.isRequired,
  onChangeEditInput: PropTypes.func.isRequired,
  onCancelInputEdit: PropTypes.func.isRequired,
  onSubmitEdited: PropTypes.func.isRequired,
};

export default TaskListItem;

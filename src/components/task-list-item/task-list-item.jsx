import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

function TaskListItem(props) {
  const {
    todo: { id, description, timeCreated, completed, editing },
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
      <div className="view">
        <input
          className="toggle"
          id={`checkbox${id}`}
          type="checkbox"
          onChange={() => onToggleCompleted(id)}
          checked={completed}
        />

        <label htmlFor={`checkbox${id}`}>
          <span className="description">{description}</span>
          <span className="created">
            created{' '}
            {formatDistanceToNow(new Date(timeCreated), {
              addSuffix: true,
              includeSeconds: true,
            })}
          </span>
        </label>

        <button
          className="icon icon-edit"
          type="button"
          aria-label="edit todo"
          onClick={() => onActiveEdited(id, description)}
        />
        <button
          className="icon icon-destroy"
          type="button"
          aria-label="delete todo"
          onClick={() => onDeleteTodo(id)}
        />
      </div>
      {editing && (
        <form style={{ margin: 0 }} onSubmit={onSubmitEdited(id)}>
          <input
            type="text"
            className="edit"
            autoFocus
            value={editTodoInputValue}
            onKeyUp={onCancelInputEdit(id)}
            onChange={onChangeEditInput}
          />
        </form>
      )}
    </li>
  );
}

TaskListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    timeCreated: PropTypes.shape({}).isRequired,
    completed: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
  }).isRequired,
  editTodoInputValue: PropTypes.string.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onActiveEdited: PropTypes.func.isRequired,
  onChangeEditInput: PropTypes.func.isRequired,
  onCancelInputEdit: PropTypes.func.isRequired,
  onSubmitEdited: PropTypes.func.isRequired,
};

export default TaskListItem;

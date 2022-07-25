import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Timer from '../timer';

const TaskItem = (props) => {
  const {
    todo: { id, description, timeCreated, completed, editing, totalTime, currentTime, activeTimer },
    onToggleCompleted,
    onDeleteTodo,
    onActiveEdited,
    onCancelInputEdit,
    onSubmitEdited,
    onChangeTimeTodo,
  } = props;

  const [editValue, setEditValue] = useState(description);

  const onChangeEditInput = ({ target: { value } }) => setEditValue(value);

  const onSubmitEdit = (event) => {
    event.preventDefault();

    onSubmitEdited(id, editValue);
  };

  const onCancelEdit = ({ code }) => {
    if (code === 'Escape') {
      setEditValue(description);
      onCancelInputEdit(id);
    }
  };

  const currentClass = classNames({
    completed,
    editing,
  });

  return (
    <li className={currentClass}>
      <div className="view">
        <ReactTooltip
          className="tooltip"
          id={`completeTodo${id}`}
          type="success"
          place="top"
          effect="solid"
          delayShow={300}
        >
          {completed ? 'Make active' : 'Make done'}
        </ReactTooltip>

        <input
          className="toggle"
          id={`checkbox${id}`}
          type="checkbox"
          onChange={() => onToggleCompleted(id)}
          checked={completed}
          data-tip
          data-for={`completeTodo${id}`}
        />

        <label
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <span className="title">{description}</span>

          <Timer
            id={id}
            currentTime={currentTime}
            completed={completed}
            totalTime={totalTime}
            onChangeTimeTodo={onChangeTimeTodo}
            activeTimer={activeTimer}
          />

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
          onClick={() => onActiveEdited(id)}
          data-tip
          data-for="editTodo"
        />

        <ReactTooltip
          className="tooltip"
          id="editTodo"
          type="error"
          place="top"
          effect="solid"
          delayShow={300}
        >
          Edit
        </ReactTooltip>

        <button
          className="icon icon-destroy"
          type="button"
          aria-label="delete todo"
          onClick={() => onDeleteTodo(id)}
          data-tip
          data-for="deleteTodo"
        />

        <ReactTooltip
          className="tooltip"
          id="deleteTodo"
          type="error"
          place="top"
          effect="solid"
          delayShow={300}
        >
          Delete
        </ReactTooltip>
      </div>

      {editing && (
        <form style={{ margin: 0 }} onSubmit={onSubmitEdit}>
          <input
            type="text"
            className="edit"
            autoFocus
            value={editValue}
            onKeyUp={onCancelEdit}
            onChange={onChangeEditInput}
          />
        </form>
      )}
    </li>
  );
};

TaskItem.propTypes = {
  todo: PropTypes.shape({
    activeTimer: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    timeCreated: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    completed: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
  }).isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onActiveEdited: PropTypes.func.isRequired,
  onCancelInputEdit: PropTypes.func.isRequired,
  onSubmitEdited: PropTypes.func.isRequired,
};

export default TaskItem;

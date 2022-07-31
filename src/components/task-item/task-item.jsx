import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Timer from '../timer';
import Tooltip from '../hoc-helper';

const TaskItem = (props) => {
  const {
    todo: { id, description, timeCreated, completed, maxTime, currentTime, activeTimer },
    submitEdit,
    onToggleCompleted,
    onDeleteTodo,
  } = props;

  const [editValue, setEditValue] = useState(description);
  const [editActive, setEditActive] = useState(false);

  const onChangeEditInput = ({ target: { value } }) => setEditValue(value);

  const onActiveEdited = () => {
    setEditActive(true);
  };

  const onSubmitEdit = (event) => {
    event.preventDefault();

    if (!editValue.trim()) return onDeleteTodo(id);

    submitEdit(id, editValue);
    setEditActive(false);
  };

  const onCancelEdit = ({ code }) => {
    if (code === 'Escape') {
      setEditValue(description);

      setEditActive(false);
    }
  };

  const currentClass = classNames({
    completed,
    editing: editActive,
  });

  return (
    <li className={currentClass}>
      <div className="view">
        <Tooltip
          id={`completeTodo${id}`}
          type="success"
          text={completed ? 'Make active' : 'Make done'}
        />

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
            maxTime={maxTime}
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
          onClick={onActiveEdited}
          data-tip
          data-for="editTodo"
        />

        <Tooltip id="editTodo" type="error" text="Edit" />

        <button
          className="icon icon-destroy"
          type="button"
          aria-label="delete todo"
          onClick={() => onDeleteTodo(id)}
          data-tip
          data-for="deleteTodo"
        />

        <Tooltip id="deleteTodo" type="error" text="Delete" />
      </div>

      {editActive && (
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
    maxTime: PropTypes.number.isRequired,
  }).isRequired,
};

export default TaskItem;

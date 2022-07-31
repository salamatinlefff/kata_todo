import React, { useContext, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Timer from '../timer';
import { TodosContext } from '../../context';
import Tooltip from '../hoc-helper';

const TaskItem = ({
  todo: { id, description, timeCreated, completed, maxTime, currentTime, activeTimer },
}) => {
  const { setTodos } = useContext(TodosContext);

  const [editValue, setEditValue] = useState(description);
  const [editTodo, setEditTodo] = useState(false);

  const onChangeEditInput = ({ target: { value } }) => setEditValue(value);

  const onToggleCompleted = () =>
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) return { ...todo, completed: !todo.completed };

        return todo;
      }),
    );

  const onDeleteTodo = (deletedId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== deletedId));
  };

  const onActiveEdited = () => {
    setEditTodo(true);
  };

  const onSubmitEdit = (event) => {
    event.preventDefault();

    if (!editValue.trim()) return onDeleteTodo(id);

    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        const newTodo = { ...todo };

        if (newTodo.id === id) {
          newTodo.description = editValue;

          setEditTodo(false);
        }

        return newTodo;
      }),
    );
  };

  const onCancelEdit = ({ code }) => {
    if (code === 'Escape') {
      setEditValue(description);

      setEditTodo(false);

      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          const newTodo = { ...todo };

          return newTodo;
        }),
      );
    }
  };

  const currentClass = classNames({
    completed,
    editing: editTodo,
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
          onChange={onToggleCompleted}
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

      {editTodo && (
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

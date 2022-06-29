import React from 'react';
import PropTypes from 'prop-types';

import TaskListItem from '../task-list-item';

function TaskList(props) {
  const {
    todos,
    editTodoInputValue,
    onDeleteTodo,
    onToggleCompleted,
    onActiveEdited,
    onSubmitEdited,
    onCancelInputEdit,
    onChangeEditInput,
  } = props;

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TaskListItem
          key={todo.id}
          todo={todo}
          editTodoInputValue={editTodoInputValue}
          onDeleteTodo={onDeleteTodo}
          onToggleCompleted={onToggleCompleted}
          onActiveEdited={onActiveEdited}
          onSubmitEdited={onSubmitEdited}
          onCancelInputEdit={onCancelInputEdit}
          onChangeEditInput={onChangeEditInput}
        />
      ))}
    </ul>
  );
}

TaskList.defaultProps = {
  todos: [],
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  editTodoInputValue: PropTypes.string.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onActiveEdited: PropTypes.func.isRequired,
  onSubmitEdited: PropTypes.func.isRequired,
  onCancelInputEdit: PropTypes.func.isRequired,
  onChangeEditInput: PropTypes.func.isRequired,
};

export default TaskList;

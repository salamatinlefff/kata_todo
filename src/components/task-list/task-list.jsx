import React, { memo } from 'react';
import PropTypes from 'prop-types';

import TaskItem from '../task-item';

const TaskList = memo((props) => {
  const {
    todos,
    onDeleteTodo,
    onToggleCompleted,
    onActiveEdited,
    onSubmitEdited,
    onCancelInputEdit,
    onChangeTimeTodo,
  } = props;

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TaskItem
          key={todo.id}
          todo={todo}
          onDeleteTodo={onDeleteTodo}
          onToggleCompleted={onToggleCompleted}
          onActiveEdited={onActiveEdited}
          onSubmitEdited={onSubmitEdited}
          onCancelInputEdit={onCancelInputEdit}
          onChangeTimeTodo={onChangeTimeTodo}
        />
      ))}
    </ul>
  );
});

TaskList.defaultProps = {
  todos: [],
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  onDeleteTodo: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onActiveEdited: PropTypes.func.isRequired,
  onSubmitEdited: PropTypes.func.isRequired,
  onCancelInputEdit: PropTypes.func.isRequired,
  onChangeTimeTodo: PropTypes.func.isRequired,
};

export default TaskList;

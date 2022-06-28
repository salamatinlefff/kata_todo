import React from 'react';
import TaskListItem from '../task-list-item';
import PropTypes from 'prop-types';

const TaskList = (props) => {
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
    <ul className='todo-list'>
      {todos.map((todo) => {
        return (
          <TaskListItem
            key={todo.id}
            {...todo}
            onDeleteTodo={onDeleteTodo}
            onToggleCompleted={onToggleCompleted}
            onActiveEdited={onActiveEdited}
            onSubmitEdited={onSubmitEdited}
            onCancelInputEdit={onCancelInputEdit}
            editTodoInputValue={editTodoInputValue}
            onChangeEditInput={onChangeEditInput}
          />
        );
      })}
    </ul>
  );
};

TaskList.defaultProps = {
  todos: [],
};

TaskList.propTypes = {
  todos: PropTypes.array,
  editTodoInputValue: PropTypes.string.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onActiveEdited: PropTypes.func.isRequired,
  onSubmitEdited: PropTypes.func.isRequired,
  onCancelInputEdit: PropTypes.func.isRequired,
  onChangeEditInput: PropTypes.func.isRequired,
};

export default TaskList;

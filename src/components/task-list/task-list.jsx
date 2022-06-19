import React from 'react';
import TaskListItem from '../task-list-item';

const TaskList = (props) => {
  const {
    todos,
    onDeleteTodo,
    onToggleCompleted,
    onActiveEdited,
    onSubmitEdited,
    onCancelInputEdit,
    editTodoInputValue,
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

export default TaskList;

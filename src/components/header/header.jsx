import React from 'react';
import TaskForm from '../task-form';

const Header = (props) => {
  const {
    onAddTodo,
    onChangeNewTodoInput,
    newTodoInputValue,
    onSubmitNewTodoInput,
  } = props;

  return (
    <header className='header'>
      <h1>todos</h1>
      <TaskForm
        onAddTodo={onAddTodo}
        onChangeNewTodoInput={onChangeNewTodoInput}
        onSubmitNewTodoInput={onSubmitNewTodoInput}
        newTodoInputValue={newTodoInputValue}
      />
    </header>
  );
};

export default Header;

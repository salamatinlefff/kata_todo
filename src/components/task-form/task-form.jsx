import React from 'react';

const TaskForm = (props) => {
  const { onSubmitNewTodoInput, onChangeNewTodoInput, newTodoInputValue } =
    props;

  return (
    <form style={{ margin: 0 }} onSubmit={onSubmitNewTodoInput}>
      <input
        className='new-todo'
        type='text'
        onChange={onChangeNewTodoInput}
        placeholder='What needs to be done?'
        value={newTodoInputValue}
        autoFocus={true}
      />
    </form>
  );
};

export default TaskForm;

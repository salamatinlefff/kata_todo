import React from 'react';
import PropTypes from 'prop-types';

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

TaskForm.propTypes = {
  onSubmitNewTodoInput: PropTypes.func.isRequired,
  onChangeNewTodoInput: PropTypes.func.isRequired,
  newTodoInputValue: PropTypes.string.isRequired,
};

export default TaskForm;

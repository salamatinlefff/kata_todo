import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TaskForm(props) {
  const [text, setText] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const { onSubmitNewTodoInput } = props;

  const onSubmit = (event) => {
    event.preventDefault();

    onSubmitNewTodoInput({ text, minutes, seconds });

    setText('');
    setMinutes('');
    setSeconds('');
  };

  const onChangeText = ({ target: { value } }) => setText(value);

  const onChangeMinutes = ({ target: { value } }) => setMinutes(value);

  const onChangeSeconds = ({ target: { value } }) => setSeconds(value);

  return (
    <form className="new-todo-form" style={{ margin: 0 }} onSubmit={onSubmit}>
      <input
        className="new-todo"
        type="text"
        onChange={onChangeText}
        placeholder="What needs to be done?"
        autoFocus
        value={text}
      />
      <input
        className="new-todo-form__timer"
        type="text"
        onChange={onChangeMinutes}
        value={minutes}
        placeholder="Min"
      />
      <input
        className="new-todo-form__timer"
        type="text"
        onChange={onChangeSeconds}
        value={seconds}
        placeholder="Sec"
      />
      <button type="submit" hidden aria-label="submit form" />
    </form>
  );
}

TaskForm.propTypes = {
  onSubmitNewTodoInput: PropTypes.func.isRequired,
};

export default TaskForm;

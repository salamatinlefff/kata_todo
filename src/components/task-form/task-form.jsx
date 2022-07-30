import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

import { timeToSeconds } from '../../utils/utils';

const TaskForm = memo((props) => {
  const [text, setText] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const { onSubmitNewTodoInput } = props;

  const onSubmit = (event) => {
    event.preventDefault();

    if (text) {
      const maxTime = timeToSeconds(minutes, seconds);
      const newTodo = {
        id: uuid(),
        timeCreated: new Date(),
        description: text,
        maxTime,
        completed: false,
        editing: false,
        currentTime: maxTime,
        activeTimer: false,
      };

      onSubmitNewTodoInput(newTodo);

      setText('');
      setMinutes('');
      setSeconds('');
    }
  };

  const onChangeText = ({ target: { value } }) => {
    setText(value);
  };

  const onChangeMinutes = ({ target: { value } }) => {
    if (value > 1439) {
      return setMinutes(1439);
    }

    setMinutes(value);
  };

  const onChangeSeconds = ({ target: { value } }) => {
    if (value > 60) {
      return setSeconds(60);
    }

    setSeconds(value);
  };

  const addZero = (num) => {
    if (num === '' || num >= 10) return num;

    if (num < 10) return `0${num}`;
  };

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
        type="number"
        onChange={onChangeMinutes}
        value={addZero(minutes)}
        min={0}
        max={1439}
        placeholder="Min"
      />
      <input
        className="new-todo-form__timer"
        type="number"
        onChange={onChangeSeconds}
        value={addZero(seconds)}
        min={0}
        max={60}
        placeholder="Sec"
      />
      <button type="submit" hidden aria-label="submit form" />
    </form>
  );
});

TaskForm.propTypes = {
  onSubmitNewTodoInput: PropTypes.func.isRequired,
};

export default TaskForm;

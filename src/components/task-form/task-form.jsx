import React, { memo, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { timeToSeconds } from '../../utils/utils';
import { TodosContext } from '../../context';

const TaskForm = memo(() => {
  const { setTodos } = useContext(TodosContext);

  const [text, setText] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const addTodo = (newTodo) => setTodos((prevTodos) => [...prevTodos, newTodo]);

  const onSubmitNewTodoInput = (newTodo) => addTodo(newTodo);

  const onSubmit = (event) => {
    event.preventDefault();

    if (text) {
      const maxTime = timeToSeconds(minutes, seconds);
      const newTodo = {
        id: uuid(),
        timeCreated: new Date(),
        description: text,
        completed: false,
        activeTimer: false,
        currentTime: maxTime,
        maxTime,
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

export default TaskForm;

import React, { memo, useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { secondsToString } from '../../utils/utils';
import { TodosContext } from '../../context';
import Tooltip from '../hoc-helper';

const Timer = memo(({ id, completed, activeTimer, currentTime, maxTime }) => {
  const { setTodos } = useContext(TodosContext);

  const onChangeTimeTodo = useCallback(
    (timer) =>
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === timer.id) return { ...todo, ...timer };

          return todo;
        }),
      ),
    [setTodos],
  );

  useEffect(() => {
    let timer;

    if (currentTime <= 0 || completed) onChangeTimeTodo({ id, activeTimer: false });

    if (activeTimer) {
      timer = setTimeout(() => {
        onChangeTimeTodo({ id, currentTime: currentTime - 1 });
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [currentTime, activeTimer, completed, id, onChangeTimeTodo]);

  const startTimer = () => onChangeTimeTodo({ id, activeTimer: true, completed: false });

  const pauseTimer = () => {
    onChangeTimeTodo({ id, activeTimer: false });
  };

  const resetTimer = () => {
    onChangeTimeTodo({ id, activeTimer: false, currentTime: maxTime });
  };

  return (
    <span className="description">
      <button
        type="button"
        aria-label="play"
        className="icon icon-play"
        onClick={startTimer}
        data-tip
        data-for="startTimer"
      />

      <Tooltip id="startTimer" type="info" text="Start" />

      <button
        type="button"
        aria-label="pause"
        className="icon icon-pause"
        onClick={pauseTimer}
        data-tip
        data-for="pauseTimer"
      />

      <Tooltip id="pauseTimer" type="info" text="Pause" />

      <button
        type="button"
        aria-label="stop"
        className="icon icon-stop"
        onClick={resetTimer}
        data-tip
        data-for="resetTimer"
      />

      <Tooltip id="resetTimer" type="info" text="Reset" />

      <span className="time">{secondsToString(currentTime)}</span>
    </span>
  );
});

Timer.propTypes = {
  id: PropTypes.string.isRequired,
  maxTime: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
};

export default Timer;

import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

import { secondsToString } from '../../utils/utils';

const Timer = ({ id, completed, activeTimer, currentTime, totalTime, onChangeTimeTodo }) => {
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
  }, [currentTime, activeTimer, completed]);

  const startTimer = () => onChangeTimeTodo({ id, activeTimer: true, completed: false });

  const pauseTimer = () => {
    onChangeTimeTodo({ id, activeTimer: false });
  };

  const resetTimer = () => {
    onChangeTimeTodo({ id, activeTimer: false, currentTime: totalTime });
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

      <ReactTooltip
        className="tooltip"
        id="startTimer"
        type="info"
        place="top"
        effect="solid"
        delayShow={300}
      >
        Start
      </ReactTooltip>

      <button
        type="button"
        aria-label="pause"
        className="icon icon-pause"
        onClick={pauseTimer}
        data-tip
        data-for="pauseTimer"
      />

      <ReactTooltip
        className="tooltip"
        id="pauseTimer"
        type="info"
        place="top"
        effect="solid"
        delayShow={300}
      >
        Pause
      </ReactTooltip>

      <button
        type="button"
        aria-label="stop"
        className="icon icon-stop"
        onClick={resetTimer}
        data-tip
        data-for="resetTimer"
      />

      <ReactTooltip
        className="tooltip"
        id="resetTimer"
        type="info"
        place="top"
        effect="solid"
        delayShow={300}
      >
        Reset
      </ReactTooltip>

      <span className="time">{secondsToString(currentTime)}</span>
    </span>
  );
};

Timer.propTypes = {
  id: PropTypes.string.isRequired,
  totalTime: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  onChangeTimeTodo: PropTypes.func.isRequired,
};

export default Timer;

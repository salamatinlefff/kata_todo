import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

import { secondsToString } from '../../utils/utils';

export default class Timer extends Component {
  state = {};

  componentDidMount() {
    const { currentTime } = this.props;

    this.setState({ currentTime });
  }

  componentDidUpdate() {
    const { currentTime } = this.state;

    if (currentTime <= 0) {
      return clearTimeout(this.interval);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.interval);
  }

  startTimer = () => {
    const { currentTime } = this.state;
    const { id, onChangeTimeTodo, totalTime } = this.props;

    if (currentTime <= 0) this.setState({ currentTime: totalTime });

    this.interval = setInterval(() => {
      this.setState((prev) => {
        onChangeTimeTodo(id, prev.currentTime - 1);
        return { currentTime: prev.currentTime - 1 };
      });
    }, 1000);
  };

  pauseTimer = () => {
    clearTimeout(this.interval);
  };

  resetTimer = () => {
    const { id, onChangeTimeTodo, totalTime } = this.props;
    this.setState({ currentTime: totalTime });
    clearTimeout(this.interval);
    onChangeTimeTodo(id, totalTime);
  };

  render() {
    const { currentTime } = this.state;

    return (
      <span className="description">
        <button
          type="button"
          aria-label="play"
          className="icon icon-play"
          onClick={this.startTimer}
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
          onClick={this.pauseTimer}
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
          onClick={this.resetTimer}
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
  }
}

Timer.propTypes = {
  id: PropTypes.string.isRequired,
  totalTime: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  onChangeTimeTodo: PropTypes.func.isRequired,
};

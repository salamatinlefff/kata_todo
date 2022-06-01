import React, { Component } from 'react';

export default class Task extends Component {
  state = {
    completed: this.props.completed,
    editing: this.props.editing,
  };

  toggleOnComplete = () => {
    this.setState(({ completed }) => {
      return {
        completed: !completed,
      };
    });
  };

  render() {
    const { description, timeCreated, deleteTodo } = this.props;
    const { completed, editing } = this.state;

    let currentClass = '';
    if (completed) currentClass += 'completed';
    if (editing) currentClass += 'editing';

    return (
      <li className={currentClass}>
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            onChange={this.toggleOnComplete}
            checked={completed}
          />

          <label>
            <span className='description'>{description}</span>
            <span className='created'>created {timeCreated} ago</span>
          </label>

          <button className='icon icon-edit'></button>
          <button className='icon icon-destroy' onClick={deleteTodo}></button>
        </div>
        {editing && (
          <input
            type='text'
            className='edit'
            value='Editing task'
            onChange={() => {
              /* чтобы react не ругался */
            }}
          />
        )}
      </li>
    );
  }
}

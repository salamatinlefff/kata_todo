import React, { Component } from 'react';
import Task from '../task/task';

export default class TaskList extends Component {
  render() {
    const { todos, deleteTodo } = this.props;

    return (
      <ul className='todo-list'>
        {todos.map(({ id, ...todo }) => {
          return (
            <Task
              key={id}
              deleteTodo={() => deleteTodo(id)}
              {...todo}
            />
          );
        })}
      </ul>
    );
  }
}

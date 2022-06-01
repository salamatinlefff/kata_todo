import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Footer from '../footer/footer';
import Header from '../header';
import TaskList from '../task-list';

class App extends Component {
  state = {
    todos: [
      {
        id: 1,
        description: 'Completed task',
        timeCreated: formatDistanceToNow(new Date(2022, 4, 31, 12, 28, 15), {
          includeSeconds: true,
        }),
        completed: true,
        editing: false,
      },
      {
        id: 2,
        description: 'Editing task',
        timeCreated: formatDistanceToNow(new Date(2022, 4, 25, 12, 25, 15), {
          includeSeconds: true,
        }),
        completed: false,
        editing: true,
      },
      {
        id: 3,
        description: 'Active task',
        timeCreated: formatDistanceToNow(new Date(2022, 4, 31, 9, 25, 15), {
          includeSeconds: true,
        }),
        completed: false,
        editing: false,
      },
    ],
  };

  deleteTodo = (deletedId) => {
    this.setState((state) => {
      const newTodos = state.todos.filter(({ id }) => id !== deletedId);

      return {
        todos: newTodos,
      };
    });
  };

  render() {
    return (
      <>
        <Header />

        <section className='main'>
          <TaskList todos={this.state.todos} deleteTodo={this.deleteTodo} />

          <Footer />
        </section>
      </>
    );
  }
}

export default App;

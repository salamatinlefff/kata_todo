import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';

import ACTIONS, { timeToSeconds } from '../utils/utils';
import Footer from '../footer';
import Header from '../header';
import TaskForm from '../task-form';
import TaskList from '../task-list';

class App extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({}), 5000);

    if (!localStorage.getItem('todo-app')) {
      localStorage.setItem(
        'todo-app',
        JSON.stringify({
          todos: [],
          filter: 'All',
        }),
      );
    }

    const newState = JSON.parse(localStorage.getItem('todo-app'));

    this.setState(newState);
  }

  componentDidUpdate(prevProps, prevState) {
    const { todos } = this.state;

    if (todos === prevState.todos) {
      return null;
    }

    const newStorageItem = { ...this.state, todos: [...todos] };

    return localStorage.setItem('todo-app', JSON.stringify(newStorageItem));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onToggleCompleted = (id) => {
    this.setState(({ todos }) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) return { ...todo, completed: !todo.completed };

        return todo;
      });

      return {
        todos: newTodos,
      };
    });
  };

  onSubmitEdited = (id, newValue) => {
    if (!newValue.trim()) return this.onDeleteTodo(id);

    return this.setState((state) => {
      const newTodos = state.todos.map((todo) => {
        const newTodo = { ...todo };

        if (newTodo.id === id) {
          newTodo.description = newValue;
          newTodo.editing = !newTodo.editing;
        }

        return newTodo;
      });

      return {
        todos: newTodos,
      };
    });
  };

  onActiveEdited = (id) => {
    const { todos } = this.state;

    const newTodos = todos.map((todo) => {
      const newTodo = { ...todo };

      if (newTodo.id === id) newTodo.editing = !newTodo.editing;

      return newTodo;
    });

    this.setState({
      todos: newTodos,
    });
  };

  onCancelInputEdit = (id) =>
    this.setState(({ todos }) => {
      const newTodos = todos.map((todo) => {
        const newTodo = { ...todo };

        if (newTodo.id === id) {
          newTodo.editing = !newTodo.editing;
        }

        return newTodo;
      });

      return {
        todos: newTodos,
      };
    });

  onDeleteTodo = (deletedId) => {
    this.setState((state) => {
      const newTodos = state.todos.filter(({ id }) => id !== deletedId);

      return {
        todos: newTodos,
      };
    });
  };

  onClearCompleted = () => {
    this.setState(({ todos }) => {
      const newTodos = todos.filter((todo) => !todo.completed);

      return {
        todos: newTodos,
      };
    });
  };

  onSubmitNewTodoInput = ({ text, minutes, seconds }) => {
    const totalTime = timeToSeconds(minutes, seconds);

    this.AddTodo({
      description: text.trim(),
      totalTime,
    });
  };

  onReturnActiveFilter = (filterName = 'All') => {
    this.setState({
      filter: filterName,
    });
  };

  onChangeTimeTodo = (id, currentTime) => {
    this.setState(({ todos }) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) return { ...todo, currentTime };

        return todo;
      });

      return {
        todos: newTodos,
      };
    });
  };

  AddTodo = (options) => {
    if (!options.description) return;

    this.setState(({ todos }) => {
      const newTodo = this.createTodo(options);

      return {
        todos: [...todos, newTodo],
      };
    });
  };

  createFilteredTodos = (todos, filter) => {
    if (filter === ACTIONS.ACTIVE) return todos.filter((todo) => !todo.completed);
    if (filter === ACTIONS.COMPLETED) return todos.filter((todo) => todo.completed);

    return [...todos];
  };

  createTodo(options) {
    const {
      description,
      timeCreated = new Date(),
      completed = false,
      editing = false,
      totalTime,
      currentTime = totalTime,
    } = options;

    return {
      id: uuid(),
      totalTime,
      currentTime,
      description,
      timeCreated,
      completed,
      editing,
    };
  }

  render() {
    const { todos, filter } = this.state;

    if (!todos) return null;

    const filteredTodos = this.createFilteredTodos(todos, filter);

    const activeTodosCount = todos.filter((todo) => !todo.completed).length;

    return (
      <>
        <Header>
          <TaskForm onSubmitNewTodoInput={this.onSubmitNewTodoInput} />
        </Header>

        <section className="main">
          {filteredTodos.length ? (
            <TaskList
              todos={filteredTodos}
              onDeleteTodo={this.onDeleteTodo}
              onToggleCompleted={this.onToggleCompleted}
              onActiveEdited={this.onActiveEdited}
              onSubmitEdited={this.onSubmitEdited}
              onCancelInputEdit={this.onCancelInputEdit}
              onChangeTimeTodo={this.onChangeTimeTodo}
            />
          ) : (
            <p className="lack-todo">No results found by filter &lsquo;{filter}&lsquo; </p>
          )}

          <Footer
            activeTodosCount={activeTodosCount}
            activeClass={filter}
            onClearCompleted={this.onClearCompleted}
            onReturnActiveFilter={this.onReturnActiveFilter}
          />
        </section>
      </>
    );
  }
}

export default App;

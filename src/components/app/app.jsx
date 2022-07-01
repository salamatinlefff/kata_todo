import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';

import ACTIONS from '../../services/services';
import Footer from '../footer';
import Header from '../header';
import TaskForm from '../task-form';
import TaskList from '../task-list';

class App extends Component {
  static createFilteredTodos = (todos, filter) => {
    if (filter === ACTIONS.ACTIVE) return todos.filter((todo) => !todo.completed);
    if (filter === ACTIONS.COMPLETED) return todos.filter((todo) => todo.completed);

    return [...todos];
  };

  static createTodo(options) {
    const { description, timeCreated = new Date(), completed = false, editing = false } = options;

    return {
      id: uuid(),
      description,
      timeCreated,
      completed,
      editing,
    };
  }

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
          newTodoInputValue: '',
          editTodoInputValue: '',
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

  onChangeEditInput = ({ target: { value } }) => {
    this.setState({
      editTodoInputValue: value,
    });
  };

  onSubmitEdited = (id) => (event) => {
    event.preventDefault();
    const { editTodoInputValue } = this.state;

    if (!editTodoInputValue.trim()) return this.onDeleteTodo(id);

    return this.setState((state) => {
      const newTodos = state.todos.map((todo) => {
        const newTodo = { ...todo };

        if (newTodo.id === id) {
          newTodo.description = state.editTodoInputValue;
          newTodo.editing = !newTodo.editing;
        }

        return newTodo;
      });

      return {
        editTodoInputValue: '',
        todos: newTodos,
      };
    });
  };

  onActiveEdited = (id, description) => {
    const { todos } = this.state;

    const newTodos = todos.map((todo) => {
      const newTodo = { ...todo };

      if (newTodo.id === id) newTodo.editing = !newTodo.editing;

      return newTodo;
    });

    this.setState({
      editTodoInputValue: description,
      todos: newTodos,
    });
  };

  onCancelInputEdit =
    (id) =>
    ({ code }) => {
      if (code === 'Escape') {
        this.setState(({ todos }) => {
          const newTodos = todos.map((todo) => {
            const newTodo = { ...todo };

            if (newTodo.id === id) {
              newTodo.editing = !newTodo.editing;
            }

            return newTodo;
          });

          return {
            editTodoInputValue: '',
            todos: newTodos,
          };
        });
      }
    };

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

  onChangeNewTodoInput = ({ target: { value } }) => {
    this.setState({ newTodoInputValue: value });
  };

  onSubmitNewTodoInput = (event) => {
    const { newTodoInputValue } = this.state;

    event.preventDefault();

    this.AddTodo({ description: newTodoInputValue.trim() });

    this.setState({
      newTodoInputValue: '',
    });
  };

  onReturnActiveFilter = (filterName = 'All') => {
    this.setState({
      filter: filterName,
    });
  };

  AddTodo = (options) => {
    if (!options.description) return;

    this.setState(({ todos }) => {
      const newTodo = App.createTodo(options);

      return {
        todos: [...todos, newTodo],
      };
    });
  };

  render() {
    const { todos, filter, editTodoInputValue, newTodoInputValue } = this.state;

    if (!todos) return null;

    const filteredTodos = App.createFilteredTodos(todos, filter);

    const activeTodosCount = todos.filter((todo) => !todo.completed).length;

    return (
      <>
        <Header>
          <TaskForm
            newTodoInputValue={newTodoInputValue}
            onChangeNewTodoInput={this.onChangeNewTodoInput}
            onSubmitNewTodoInput={this.onSubmitNewTodoInput}
          />
        </Header>

        <section className="main">
          {filteredTodos.length ? (
            <TaskList
              todos={filteredTodos}
              editTodoInputValue={editTodoInputValue}
              onDeleteTodo={this.onDeleteTodo}
              onToggleCompleted={this.onToggleCompleted}
              onActiveEdited={this.onActiveEdited}
              onSubmitEdited={this.onSubmitEdited}
              onCancelInputEdit={this.onCancelInputEdit}
              onChangeEditInput={this.onChangeEditInput}
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

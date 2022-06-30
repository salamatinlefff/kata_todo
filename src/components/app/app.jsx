import React, { Component } from 'react';

import Footer from '../footer';
import Header from '../header';
import TaskForm from '../task-form';
import TaskList from '../task-list';

class App extends Component {
  static createFilteredTodos = (todos, filter) => {
    if (filter === 'Active') return todos.filter((todo) => !todo.completed);
    if (filter === 'Completed') return todos.filter((todo) => todo.completed);

    return [...todos];
  };

  constructor() {
    super();

    this.maxId = 0;

    this.state = {
      todos: [
        this.createTodo({
          description: 'Learn React',
          timeCreated: new Date(2022, 4, 31, 12, 28, 15),
          completed: false,
          editing: false,
        }),
        this.createTodo({
          description: 'Refactor code',
          timeCreated: new Date(2022, 4, 31, 9, 25, 15),
          completed: false,
          editing: false,
        }),
        this.createTodo({
          description: 'Cancel editing',
          timeCreated: new Date(2022, 5, 19, 10, 25, 15),
          completed: true,
        }),
      ],
      filter: 'All',
      newTodoInputValue: '',
      editTodoInputValue: '',
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({}), 5000);
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

  onCancelInputEdit(id) {
    return ({ code }) => {
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
  }

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
      const newTodo = this.createTodo(options);

      return {
        todos: [...todos, newTodo],
      };
    });
  };

  createTodo(options) {
    const { description, timeCreated = new Date(), completed = false, editing = false } = options;
    this.maxId += 1;

    return {
      id: this.maxId,
      description,
      timeCreated,
      completed,
      editing,
    };
  }

  render() {
    const { todos, filter, editTodoInputValue, newTodoInputValue } = this.state;

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

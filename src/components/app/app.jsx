import React, { Component } from 'react';
import Footer from '../footer';
import Header from '../header';
import TaskList from '../task-list';

class App extends Component {
  maxId = 0;

  state = {
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
    this.setState(() => ({
      editTodoInputValue: value,
    }));
  };

  onSubmitEdited = (id) => {
    return (event) => {
      event.preventDefault();

      this.setState(({ todos, editTodoInputValue }) => {
        const newTodos = todos.map((todo) => {
          if (todo.id === id) {
            todo.description = editTodoInputValue;
            todo.editing = !todo.editing;
          }

          return todo;
        });

        return {
          editTodoInputValue: '',
          todos: newTodos,
        };
      });
    };
  };

  onActiveEdited = (id, description) => {
    const newTodos = this.state.todos.map((todo) => {
      if (todo.id === id) todo.editing = !todo.editing;

      return todo;
    });

    this.setState({
      editTodoInputValue: description,
      todos: newTodos,
    });
  };

  onCancelInputEdit = (id) => {
    return ({ code }) => {
      if (code === 'Escape') {
        this.setState(({ todos }) => {
          const newTodos = todos.map((todo) => {
            if (todo.id === id) {
              todo.editing = !todo.editing;
            }

            return todo;
          });

          return {
            editTodoInputValue: '',
            todos: newTodos,
          };
        });
      }
    };
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
    event.preventDefault();

    this.AddTodo({ description: this.state.newTodoInputValue.trim() });

    this.setState({
      newTodoInputValue: '',
    });
  };

  onReturnActiveFilter = (filterName = this.state.filter) => {
    this.setState({
      filter: filterName,
    });
  };

  createTodo(options) {
    const {
      description,
      timeCreated = new Date(),
      completed = false,
      editing = false,
    } = options;

    return {
      id: (this.maxId += 1),
      description,
      timeCreated,
      completed,
      editing,
    };
  }

  AddTodo = (label) => {
    if (label.description) {
      this.setState(({ todos }) => {
        const newTodo = this.createTodo(label);

        return {
          todos: [...todos, newTodo],
        };
      });
    }
  };

  createFilteredTodos = (todos, filter) => {
    if (filter === 'All') return [...todos];
    if (filter === 'Active') return todos.filter((todo) => !todo.completed);
    if (filter === 'Completed') return todos.filter((todo) => todo.completed);
  };

  render() {
    const { todos, filter } = this.state;

    const filteredTodos = this.createFilteredTodos(todos, filter);

    const activeTodosCount = todos.filter((todo) => !todo.completed).length;

    return (
      <>
        <Header
          newTodoInputValue={this.state.newTodoInputValue}
          onChangeNewTodoInput={this.onChangeNewTodoInput}
          onSubmitNewTodoInput={this.onSubmitNewTodoInput}
        />

        <section className='main'>
          <TaskList
            todos={filteredTodos}
            editTodoInputValue={this.state.editTodoInputValue}
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

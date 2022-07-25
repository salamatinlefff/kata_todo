import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import ACTIONS, { timeToSeconds } from '../../utils/utils';
import Footer from '../footer';
import Header from '../header';
import TaskForm from '../task-form';
import TaskList from '../task-list';

const App = () => {
  const [filter, setFilter] = useState('All');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('todo-app')) {
      const todoApp = {
        todos: [],
        filter: 'All',
      };

      localStorage.setItem('todo-app', JSON.stringify(todoApp));
    }

    const newState = JSON.parse(localStorage.getItem('todo-app'));

    setTodos(newState.todos);
    setFilter(newState.filter);

    window.addEventListener('storage', (event) => {
      localStorage.setItem('todo-app', event.newValue || '');

      setTodos(JSON.parse(event.newValue));
    });
  }, []);

  useEffect(() => {
    const newStorageItem = { filter, todos: [...todos] };

    const interval = setInterval(() => setTodos((prev) => [...prev]), 5000);

    localStorage.setItem('todo-app', JSON.stringify(newStorageItem));

    return () => {
      clearInterval(interval);
    };
  });

  const createTodo = (options) => {
    const {
      description,
      timeCreated = new Date(),
      completed = false,
      editing = false,
      totalTime,
      currentTime = totalTime,
      activeTimer = false,
    } = options;

    return {
      id: uuid(),
      totalTime,
      currentTime,
      description,
      timeCreated,
      completed,
      editing,
      activeTimer,
    };
  };

  const addTodo = (options) => {
    if (!options.description) return;

    setTodos((prevTodos) => {
      const newTodo = createTodo(options);

      return [...prevTodos, newTodo];
    });
  };

  const onToggleCompleted = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) return { ...todo, completed: !todo.completed };

        return todo;
      }),
    );
  };

  const onDeleteTodo = (deletedId) => {
    setTodos((prevTodos) => prevTodos.filter(({ id }) => id !== deletedId));
  };

  const onSubmitEdited = (id, newValue) => {
    if (!newValue.trim()) return onDeleteTodo(id);

    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        const newTodo = { ...todo };

        if (newTodo.id === id) {
          newTodo.description = newValue;
          newTodo.editing = !newTodo.editing;
        }

        return newTodo;
      }),
    );
  };

  const onActiveEdited = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        const newTodo = { ...todo };

        if (newTodo.id === id) newTodo.editing = !newTodo.editing;

        return newTodo;
      }),
    );
  };

  const onCancelInputEdit = (id) =>
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        const newTodo = { ...todo };

        if (newTodo.id === id) {
          newTodo.editing = !newTodo.editing;
        }

        return newTodo;
      }),
    );

  const onClearCompleted = () =>
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));

  const onSubmitNewTodoInput = ({ text, minutes, seconds }) => {
    const totalTime = timeToSeconds(minutes, seconds);

    addTodo({
      description: text.trim(),
      totalTime,
    });
  };

  const onReturnActiveFilter = (filterName = 'All') => setFilter(filterName);

  const onChangeTimeTodo = (timer) =>
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === timer.id) return { ...todo, ...timer };

        return todo;
      }),
    );

  const createFilteredTodos = (arr, prop) => {
    switch (prop) {
      case ACTIONS.ACTIVE:
        return arr.filter((todo) => !todo.completed);
      case ACTIONS.COMPLETED:
        return arr.filter((todo) => todo.completed);
      default:
        return [...arr];
    }
  };

  if (!todos) return null;

  const filteredTodos = createFilteredTodos(todos, filter);

  const activeTodosCount = todos.filter((todo) => !todo.completed).length;

  return (
    <>
      <Header>
        <TaskForm onSubmitNewTodoInput={onSubmitNewTodoInput} />
      </Header>

      <section className="main">
        {filteredTodos.length ? (
          <TaskList
            todos={filteredTodos}
            onDeleteTodo={onDeleteTodo}
            onToggleCompleted={onToggleCompleted}
            onActiveEdited={onActiveEdited}
            onSubmitEdited={onSubmitEdited}
            onCancelInputEdit={onCancelInputEdit}
            onChangeTimeTodo={onChangeTimeTodo}
          />
        ) : (
          <p className="lack-todo">No results found by filter &lsquo;{filter}&lsquo; </p>
        )}

        <Footer
          activeTodosCount={activeTodosCount}
          activeClass={filter}
          onClearCompleted={onClearCompleted}
          onReturnActiveFilter={onReturnActiveFilter}
        />
      </section>
    </>
  );
};

export default App;

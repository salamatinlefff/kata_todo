import React, { memo, useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import ACTIONS, { timeToSeconds } from '../../utils/utils';
import Empty from '../empty';
import Footer from '../footer';
import Header from '../header';
import TaskForm from '../task-form';
import TaskList from '../task-list';

const App = memo(() => {
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

    const interval = setInterval(() => setTodos((prev) => [...prev]), 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newStorageItem = { filter, todos: [...todos] };

    localStorage.setItem('todo-app', JSON.stringify(newStorageItem));
  });

  const createTodo = useCallback((options) => {
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
  }, []);

  const addTodo = useCallback(
    (options) => {
      if (!options.description) return;

      setTodos((prevTodos) => {
        const newTodo = createTodo(options);

        return [...prevTodos, newTodo];
      });
    },
    [createTodo],
  );

  const onToggleCompleted = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) return { ...todo, completed: !todo.completed };

        return todo;
      }),
    );
  }, []);

  const onDeleteTodo = useCallback((deletedId) => {
    setTodos((prevTodos) => prevTodos.filter(({ id }) => id !== deletedId));
  }, []);

  const onSubmitEdited = useCallback(
    (id, newValue) => {
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
    },
    [onDeleteTodo],
  );

  const onActiveEdited = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        const newTodo = { ...todo };

        if (newTodo.id === id) newTodo.editing = !newTodo.editing;

        return newTodo;
      }),
    );
  }, []);

  const onCancelInputEdit = useCallback(
    (id) =>
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          const newTodo = { ...todo };

          if (newTodo.id === id) {
            newTodo.editing = !newTodo.editing;
          }

          return newTodo;
        }),
      ),
    [],
  );

  const onClearCompleted = useCallback(
    () => setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed)),
    [],
  );

  const onSubmitNewTodoInput = useCallback(
    ({ text, minutes, seconds }) => {
      const totalTime = timeToSeconds(minutes, seconds);

      addTodo({
        description: text.trim(),
        totalTime,
      });
    },
    [addTodo],
  );

  const onReturnActiveFilter = useCallback((filterName = 'All') => setFilter(filterName), []);

  const onChangeTimeTodo = useCallback(
    (timer) =>
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === timer.id) return { ...todo, ...timer };

          return todo;
        }),
      ),
    [],
  );

  const createFilteredTodos = useCallback((arr, prop) => {
    switch (prop) {
      case ACTIONS.ACTIVE:
        return arr.filter((todo) => !todo.completed);
      case ACTIONS.COMPLETED:
        return arr.filter((todo) => todo.completed);
      default:
        return [...arr];
    }
  }, []);

  const filteredTodos = createFilteredTodos(todos, filter);

  const activeTodosCount = todos.filter((todo) => !todo.completed).length;

  const hasData = !!filteredTodos.length;
  const empty = !filteredTodos.length;

  return (
    <>
      <Header>
        <TaskForm onSubmitNewTodoInput={onSubmitNewTodoInput} />
      </Header>

      <section className="main">
        {hasData && (
          <TaskList
            todos={filteredTodos}
            onDeleteTodo={onDeleteTodo}
            onToggleCompleted={onToggleCompleted}
            onActiveEdited={onActiveEdited}
            onSubmitEdited={onSubmitEdited}
            onCancelInputEdit={onCancelInputEdit}
            onChangeTimeTodo={onChangeTimeTodo}
          />
        )}

        {empty && <Empty filter={filter} />}

        <Footer
          activeTodosCount={activeTodosCount}
          activeClass={filter}
          onClearCompleted={onClearCompleted}
          onReturnActiveFilter={onReturnActiveFilter}
        />
      </section>
    </>
  );
});

export default App;

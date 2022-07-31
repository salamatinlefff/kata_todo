import React, { useContext, useEffect } from 'react';

import { FilterContext, TodosContext } from '../../context';
import FilterButtonList from '../filter-button-list';
import Footer from '../footer';
import Header from '../header';
import Main from '../main';
import TaskForm from '../task-form';
import TaskList from '../task-list';

const App = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const { filter, setFilter } = useContext(FilterContext);

  const updateStorage = (item) => {
    let newItem = item;

    if (typeof item === 'object') {
      newItem = JSON.stringify(item);
    }

    localStorage.setItem('todo-app', newItem);
  };

  const updateState = () => {
    const storage = JSON.parse(localStorage.getItem('todo-app'));

    setTodos(storage.todos);
    setFilter(storage.filter);
  };

  useEffect(() => {
    //* Save default data
    if (!localStorage.getItem('todo-app')) {
      const todoApp = {
        todos: [],
        filter: 'All',
      };

      updateStorage(todoApp);
    }

    updateState();

    //* Save to localStorage in other window
    window.addEventListener('storage', (event) => {
      updateStorage(event.newValue || '');

      setTodos(JSON.parse(event.newValue).todos);
    });

    //* Update created time todo
    const interval = setInterval(() => setTodos((prev) => [...prev]), 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (filter && todos) {
      const newStorageItem = { filter, todos: [...todos] };

      updateStorage(newStorageItem);
    }
  });

  if (!todos) return null;

  return (
    <>
      <Header>
        <TaskForm />
      </Header>

      <Main>
        <TaskList />

        <Footer>
          <FilterButtonList />
        </Footer>
      </Main>
    </>
  );
};

export default App;

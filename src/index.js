import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';

import App from './components';
import { FilterContext, TodosContext } from './context';

const root = ReactDOM.createRoot(document.querySelector('.todoapp'));

const Main = () => {
  const [filter, setFilter] = useState();
  const [todos, setTodos] = useState();

  return (
    <TodosContext.Provider value={useMemo(() => ({ todos, setTodos }), [todos])}>
      <FilterContext.Provider value={useMemo(() => ({ filter, setFilter }), [filter])}>
        <App />
      </FilterContext.Provider>
    </TodosContext.Provider>
  );
};

root.render(<Main />);

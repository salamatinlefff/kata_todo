import React, { memo, useContext } from 'react';

import { TodosContext } from '../../context';

const Footer = memo((props) => {
  const { todos, setTodos } = useContext(TodosContext);

  const onClearCompleted = () =>
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));

  const activeTodosCount = todos.filter((todo) => !todo.completed).length;

  const { children } = props;

  return (
    <footer className="footer">
      <span className="todo-count">{activeTodosCount} items left</span>
      {children}
      <button className="clear-completed" type="button" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
});

export default Footer;

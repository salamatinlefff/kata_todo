import React, { memo, useCallback, useContext } from 'react';

import TaskItem from '../task-item';
import Empty from '../empty';
import { FilterContext, TodosContext } from '../../context';
import { ACTIONS } from '../../utils';

const TaskList = memo(() => {
  const { filter } = useContext(FilterContext);
  const { todos, setTodos } = useContext(TodosContext);

  const onToggleCompleted = useCallback(
    (id) =>
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === id) return { ...todo, completed: !todo.completed };

          return todo;
        }),
      ),
    [setTodos],
  );

  const onDeleteTodo = useCallback(
    (deletedId) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== deletedId));
    },
    [setTodos],
  );

  const submitEdit = useCallback(
    (id, newValue) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          const newTodo = { ...todo };

          if (newTodo.id === id) {
            newTodo.description = newValue;
          }

          return newTodo;
        }),
      );
    },
    [setTodos],
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

  const filteredTodos = createFilteredTodos(todos, filter);

  const empty = !filteredTodos.length;

  return (
    <>
      {empty && <Empty filter={filter} />}

      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <TaskItem
            key={todo.id}
            todo={todo}
            submitEdit={submitEdit}
            onToggleCompleted={onToggleCompleted}
            onDeleteTodo={onDeleteTodo}
          />
        ))}
      </ul>
    </>
  );
});

export default TaskList;

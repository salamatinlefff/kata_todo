import React, { memo, useContext } from 'react';

import TaskItem from '../task-item';
import Empty from '../empty';
import { FilterContext, TodosContext } from '../../context';
import { ACTIONS } from '../../utils';

const TaskList = memo(() => {
  const { filter } = useContext(FilterContext);
  const { todos } = useContext(TodosContext);

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
          <TaskItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
});

export default TaskList;

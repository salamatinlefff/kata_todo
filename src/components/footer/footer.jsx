import React from 'react';
import FilterButton from '../filter-button';

const Footer = (props) => {
  const {
    activeTodosCount,
    onClearCompleted,
    activeClass,
    onReturnActiveFilter,
  } = props;
  const buttonsContent = ['All', 'Active', 'Completed'];

  return (
    <footer className='footer'>
      <span className='todo-count'>{activeTodosCount} items left</span>

      <ul className='filters'>
        {buttonsContent.map((content, index) => {
          return (
            <li key={index}>
              <FilterButton
                activeClass={activeClass}
                content={content}
                onReturnActiveFilter={onReturnActiveFilter}
              />
            </li>
          );
        })}
      </ul>

      <button className='clear-completed' onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;

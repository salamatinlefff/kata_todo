import React from 'react';
import PropTypes from 'prop-types';
import FilterButton from '../filter-button';

const Footer = (props) => {
  const {
    activeTodosCount,
    activeClass,
    onClearCompleted,
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

Footer.propTypes = {
  activeTodosCount: PropTypes.number.isRequired,
  activeClass: PropTypes.string.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  onReturnActiveFilter: PropTypes.func.isRequired,
};

export default Footer;

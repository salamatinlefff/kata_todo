import React from 'react';
import PropTypes from 'prop-types';

const FilterButton = (props) => {
  const { content, activeClass, onReturnActiveFilter } = props;

  const className = activeClass === content ? 'selected' : '';

  return (
    <button className={className} onClick={() => onReturnActiveFilter(content)}>
      {content}
    </button>
  );
};

FilterButton.propTypes = {
  content: PropTypes.string.isRequired,
  activeClass: PropTypes.string.isRequired,
  onReturnActiveFilter: PropTypes.func.isRequired,
};

export default FilterButton;

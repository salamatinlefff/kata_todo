import React from 'react';

const FilterButton = (props) => {
  const { content, activeClass, onReturnActiveFilter } = props;

  const className = activeClass === content ? 'selected' : '';

  return (
    <button className={className} onClick={() => onReturnActiveFilter(content)}>
      {content}
    </button>
  );
};

export default FilterButton;

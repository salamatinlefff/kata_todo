import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const FilterButton = memo((props) => {
  const { content, activeClass, onChangeActiveFilter } = props;

  const className = classNames({
    selected: activeClass === content,
  });

  return (
    <button className={className} type="button" onClick={() => onChangeActiveFilter(content)}>
      {content}
    </button>
  );
});

FilterButton.propTypes = {
  content: PropTypes.string.isRequired,
  activeClass: PropTypes.string.isRequired,
  onChangeActiveFilter: PropTypes.func.isRequired,
};

export default FilterButton;

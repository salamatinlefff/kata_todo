import React, { useContext } from 'react';

import { FilterContext } from '../../context';
import FilterButton from '../filter-button/filter-button';

export default function FilterButtonList() {
  const { filter, setFilter } = useContext(FilterContext);

  const buttonsContent = ['All', 'Active', 'Completed'];

  const onChangeActiveFilter = (filterName = 'All') => setFilter(filterName);

  return (
    <ul className="filters">
      {buttonsContent.map((content) => (
        <li key={content}>
          <FilterButton
            activeClass={filter}
            content={content}
            onChangeActiveFilter={onChangeActiveFilter}
          />
        </li>
      ))}
    </ul>
  );
}

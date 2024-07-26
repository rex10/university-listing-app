import React from 'react';
import Dropdown from './common/Dropdown';

const SortingOptions = ({ sortOrder, handleSort }) => {
  const options = [
    { value: 'asc', label: 'Sort Ascending' },
    { value: 'desc', label: 'Sort Descending' }
  ];

  return (
    <Dropdown
      value={sortOrder}
      options={options}
      handleChange={handleSort}
      placeholder="Select Sorting Order"
    />
  );
};

export default SortingOptions;

import React from 'react';
import Dropdown from './common/Dropdown';

const FilterOptions = ({ filter, handleFilter }) => {
  const options = [
    { value: 'all', label: 'All' },
    { value: 'college', label: 'College' },
    { value: 'institute', label: 'Institute' },
    { value: 'university', label: 'University' }
  ];

  return (
    <Dropdown
      value={filter}
      options={options}
      handleChange={handleFilter}
      placeholder="Select Filter"
    />
  );
};

export default FilterOptions;

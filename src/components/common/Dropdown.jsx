import React, { useState } from 'react';
import '../../styles/common/dropdown.css';

const Dropdown = ({ value, options, handleChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectChange = (e) => {
    handleChange(e.target.value);
    setIsOpen(false); // Close dropdown on selection
  };

  return (
    <div className={`dropdown ${isOpen ? 'open' : ''}`} data-dropdown="true">
      <select
        value={value}
        onChange={handleSelectChange}
        onClick={toggleOpen}
        onBlur={() => setIsOpen(false)} // Close dropdown when it loses focus
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;

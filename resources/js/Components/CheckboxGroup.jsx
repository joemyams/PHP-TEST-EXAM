// CheckboxGroup.jsx
import React from 'react';

const CheckboxGroup = ({ options, selectedValues, onChange, className = '' }) => {
  return (
    <div className={className}>
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            type="checkbox"
            id={option.value}
            name="checkboxGroup"
            value={option.value}
            checked={selectedValues.includes(option.value)}
            onChange={() => onChange(option.value)}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
          />
          <label htmlFor={option.value} className="ml-2 text-sm font-medium text-black">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;

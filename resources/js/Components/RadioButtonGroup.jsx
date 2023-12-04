export default function RadioButtonGroup({ options, selectedValue, onChange, className = '' }) {
    return (
      <div className={className}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              id={option.value}
              name="radioGroup" 
              value={option.value}
              checked={selectedValue === option.value}
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
  }

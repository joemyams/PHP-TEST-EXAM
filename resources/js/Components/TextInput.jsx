import React, { useState, useEffect } from 'react';

export default function TextInput({ onInputChange, formSubmitted }) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (formSubmitted) {
      setText('');
    }
  }, [formSubmitted]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setText(inputValue);

    if (onInputChange) {
      onInputChange(inputValue);
    }
  };

  return (
    <div>
    <label htmlFor="text" className="block text-sm font-medium text-black">
      Text Box (100 Characters)
    </label>
    <div className="mt-1">
      <input
        type="text"
        name="text"
        id="text"
        value={text}
        onChange={handleChange}
        className="block w-full md:w-[400px] border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  </div>
  );
}

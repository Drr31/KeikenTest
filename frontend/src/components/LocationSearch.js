import React, { useState } from 'react';
import './LocationSearch.css';

const LocationSearch = ({ onSearch }) => {
  const [cityInput, setCityInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cityInput.trim()) {
      onSearch(cityInput);
      setCityInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="location-search">
      <input
        type="text"
        placeholder="Enter a city..."
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default LocationSearch; 
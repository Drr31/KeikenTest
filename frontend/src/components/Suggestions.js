import React from 'react';
import './Suggestions.css';

const Suggestions = ({ suggestion }) => {
  if (!suggestion) return null;

  return (
    <div className="suggestions-container">
      <h3>Suggested Activities</h3>
      <div className="suggestion-content">
        <i className="suggestion-icon">💡</i>
        <p>{suggestion}</p>
      </div>
    </div>
  );
};

export default Suggestions; 
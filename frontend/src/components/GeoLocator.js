import React from 'react';

const GeoLocator = ({ onPosition }) => {
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onPosition, (error) => {
        console.error('Error getting location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <button onClick={getLocation}>
      Get Weather for My Location
    </button>
  );
};

export default GeoLocator;

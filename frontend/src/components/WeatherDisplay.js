// src/components/WeatherDisplay.js
import React from 'react';
import { motion } from 'framer-motion';

const WeatherDisplay = ({ weather }) => {
  // Check that weather, weather.current, and weather.current.weather_descriptions exist.
  if (!weather || !weather.current || !Array.isArray(weather.current.weather_descriptions)) {
    return <p>Loading weather data...</p>;
  }

  // Safely access description and weather icon
  const description =
    weather.current.weather_descriptions.length > 0
      ? weather.current.weather_descriptions[0]
      : "No description available";
  const weatherIcon =
    weather.current.weather_icons && weather.current.weather_icons.length > 0
      ? weather.current.weather_icons[0]
      : "";

  return (
    <motion.div
      className="weather-display"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>
        Current Weather for {weather.location?.name}, {weather.location?.country}
      </h2>
      <p>{description}</p>
      <p>Temperature: {weather.current.temperature}°</p>
      {weatherIcon && (
        <img
          src={weatherIcon}
          alt="Weather icon"
          style={{ width: '64px', height: '64px' }}
        />
      )}
      <p>
        Wind: {weather.current.wind_speed} km/h ({weather.current.wind_dir})
      </p>
      <p>Humidity: {weather.current.humidity}%</p>
    </motion.div>
  );
};

export default WeatherDisplay;

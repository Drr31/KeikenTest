import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import GeoLocator from './components/GeoLocator';
import WeatherDisplay from './components/WeatherDisplay';
import Suggestions from './components/Suggestions';
import MapDisplay from './components/MapDisplay';
import Spinner from './components/Spinner';
import LocationSearch from './components/LocationSearch';

function App() {
  const [weather, setWeather] = useState(null);
  const [suggestion, setSuggestion] = useState('');
  const [position, setPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load or initialize the units preference from localStorage
  const [units, setUnits] = useState(() => localStorage.getItem('units') || 'm');

  // Whenever units change, store it in localStorage
  useEffect(() => {
    localStorage.setItem('units', units);
  }, [units]);

  // Toggle between metric ('m') and imperial ('f')
  const toggleUnits = () => {
    setUnits((prev) => (prev === 'm' ? 'f' : 'm'));
  };

  const handlePosition = async (pos) => {
    setPosition(pos);
    const { latitude, longitude } = pos.coords;

    setIsLoading(true);
    try {
      const weatherResponse = await axios.get(
        `http://127.0.0.1:5001/api/weather?lat=${latitude}&lon=${longitude}&units=${units}`
      );
      setWeather(weatherResponse.data);

      const context = {
        weather: weatherResponse.data,
        time: new Date().toLocaleTimeString(),
      };

      const suggestionResponse = await axios.post(
        'http://127.0.0.1:5001/api/suggestions',
        { context }
      );
      setSuggestion(suggestionResponse.data.suggestion);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch weather by city
  const fetchWeatherByCity = async (cityName) => {
    setIsLoading(true);
    try {
      const weatherResponse = await axios.get(
        `http://127.0.0.1:5001/api/weather?city=${cityName}&units=${units}`
      );
      setWeather(weatherResponse.data);

      // Also fetch a suggestion
      const context = {
        weather: weatherResponse.data,
        time: new Date().toLocaleTimeString(),
      };
      const suggestionResponse = await axios.post(
        'http://127.0.0.1:5001/api/suggestions',
        { context }
      );
      setSuggestion(suggestionResponse.data.suggestion);

      // Update the map position if the Weatherstack response includes lat/lon
      if (weatherResponse.data.location) {
        // Weatherstack typically returns lat/lon as strings
        const lat = parseFloat(weatherResponse.data.location.lat);
        const lon = parseFloat(weatherResponse.data.location.lon);
        setPosition({ coords: { latitude: lat, longitude: lon } });
      }
    } catch (error) {
      console.error('Error fetching city weather:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      {isLoading && <Spinner />}

      <h1>Local Explorer</h1>

      {/* Toggle Units & GeoLocator */}
      <button onClick={toggleUnits}>
        Switch to {units === 'm' ? 'Imperial' : 'Metric'} Units
      </button>
      <GeoLocator onPosition={handlePosition} />

      {/* New location search */}
      <LocationSearch onSearch={fetchWeatherByCity} />

      {weather && <WeatherDisplay weather={weather} />}
      <Suggestions suggestion={suggestion} />
      <MapDisplay position={position} suggestion={suggestion} />
    </div>
  );
}

export default App;

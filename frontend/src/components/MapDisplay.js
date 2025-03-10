import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { motion } from 'framer-motion';

const MapDisplay = ({ position }) => {
  if (!position) {
    return <p>Loading map...</p>;
  }

  const { latitude, longitude } = position.coords;
  const center = { lat: latitude, lng: longitude };
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    margin: '20px auto',
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={14}>
          <Marker position={center} />
        </GoogleMap>
      </motion.div>
    </LoadScript>
  );
};

export default MapDisplay;
import React from 'react';
import { motion } from 'framer-motion';
import './Spinner.css';

const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <motion.div
        className="spinner"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default Spinner; 
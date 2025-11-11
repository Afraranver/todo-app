import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading todos...</p>
    </div>
  );
};

export default LoadingSpinner;
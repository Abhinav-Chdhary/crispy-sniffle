import React from 'react';

const TopBanner = () => {
  const bannerStyle = {
    backgroundColor: '#ffcc00',
    color: '#333',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0px 4px 2px -2px gray',
  };

  return (
    <div style={bannerStyle}>
      <h1>Crispy Sniffle</h1>
    </div>
  );
};

export default TopBanner;

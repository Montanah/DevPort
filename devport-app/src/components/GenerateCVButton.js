import React from 'react';
import Footer from './Footer';

const GenerateCVButton = () => {
  const userId = localStorage.getItem('userId');
  const generateCVApiUrl = `http://165.227.108.97/generate-cv/${userId}`;

  const handleDownload = () => {
    window.location.href = generateCVApiUrl;
  };

  return (
    <div>
      <button
        id="generate-cv-button"
        type="button"
        className="LSbutton"
        style={{ font: 'black', display: 'block' }}
        onClick={handleDownload}
      >
        Download CV
      </button>
      <Footer />
    </div>
  );
};

export default GenerateCVButton;
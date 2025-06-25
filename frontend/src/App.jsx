import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';

export default function App() {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const fetchBingImage = async () => {
      try {
        // Switched to Picsum Photos for reliable CORS-friendly random images.
        // This provides a random image with specified width and height.
        // No API key or CORS proxy needed for this simple random endpoint.
        const imageUrl = `https://picsum.photos/1920/1080?random=${Math.random()}`; // Add random param to ensure new image on refresh
        setBackgroundImage(`url(${imageUrl})`);
      } catch (error) {
        console.error("Failed to fetch background image:", error);
        // Fallback to a default or gradient if fetch fails
        setBackgroundImage('linear-gradient(to bottom right, #e0f2f7, #bbdefb)'); // A more subtle gradient
      }
    };
    fetchBingImage();
  }, []); 

  return (
    <div className="min-h-screen font-sans bg-cover bg-center" style={{ backgroundImage: backgroundImage }}>
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Calendar App</h1>
            <p className="text-gray-600">Manage your schedule with style</p>
          </div>
          <Calendar />
        </div>
      </div>
    </div>
  );
}
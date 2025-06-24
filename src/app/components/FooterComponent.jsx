'use client';

import React, { useState, useEffect } from 'react';
import ParticlesBackground from './particlesBg';

const FooterComponent = () => {
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    async function fetchLogo() {
      try {
        const res = await fetch('/api/HomePage');
        if (!res.ok) throw new Error('Failed to fetch logo');
        const data = await res.json();
        setLogoUrl(data.LogoUrl);
      } catch (err) {
        console.error('Error fetching logo:', err);
      }
    }
    fetchLogo();
  }, []);

  return (
    <div className="w-full bg-white-900 text-white py-16 h-[60vh]">
      {/* <div >
        <ParticlesBackground />
      </div> */}
      <div className="container mx-auto px-4">
        <div className="flex">
          {/* Left Half */}
          <div className="w-1/2 mt-[13vh] flex flex-col items-center justify-center">
            {logoUrl && (
              <img 
                src={logoUrl} 
                alt="Company Logo" 
                className="h-[10vh] object-contain mb-6"
              />
            )}
            <p className="text-center text-gray-700 max-w-md leading-relaxed mb-6">
              We're always in search for talented and motivated people. Don't be shy introduce yourself!
            </p>
            <button 
              className="px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg"
              style={{
                border: '2px solid rgba(65, 175, 255, 1)',
                color: 'rgba(65, 175, 255, 1)',
                backgroundColor: 'transparent'
              }}
            >
              Get Started
            </button>
          </div>
          
          {/* Right Half */}
          <div className="w-1/2 bg-white flex mt-[13vh]">
            {/* First div with equal width */}
            <div className="w-1/2 bg-white p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Our Company</h3>
              <div className="flex flex-col space-y-2">
                <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Contact Us</a>
                <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Placement</a>
                <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Log</a>
                <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Courses</a>
                <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">Terms and Conditions</a>
              </div>
            </div>
            
            {/* Second div with equal width */}
            <div className="w-1/2 bg-white p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Get Contact</h3>
              <div className="flex flex-col space-y-2">
                <p className="text-gray-600">Phone:</p>
                <p className="text-gray-600">Email:</p>
                <p className="text-gray-600">Location:</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;








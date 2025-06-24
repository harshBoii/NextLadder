'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ParticlesBackground from './particlesBg';
import Link from 'next/link';

const FooterComponent = () => {
  const [logoUrl, setLogoUrl] = useState('');
  const containerRef = useRef(null);
  const radialLightRef = useRef(null);
  const contentRef = useRef(null);
  const borderRef = useRef(null);

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

  useEffect(() => {
    const container = containerRef.current;
    const radialLight = radialLightRef.current;
    const content = contentRef.current;
    const border = borderRef.current;

    if (!container || !radialLight || !content || !border) return;

    // Initial state - dim content and subtle border
    gsap.set(content, { opacity: 0.3 });
    gsap.set(radialLight, { 
      opacity: 0.1,
      scale: 0.5,
      filter: 'blur(20px)'
    });
    gsap.set(border, {
      opacity: 0.2,
      boxShadow: '0 0 10px rgba(0, 255, 255, 0.1)'
    });

    const handleMouseEnter = () => {
      gsap.to(radialLight, {
        opacity: 1,
        scale: 1.5,
        filter: 'blur(5px)',
        duration: 0.8,
        ease: 'power2.out'
      });
      
      gsap.to(content, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.2
      });

      gsap.to(border, {
        opacity: 1,
        boxShadow: '0 0 30px rgba(0, 255, 255, 0.8), inset 0 0 30px rgba(0, 255, 255, 0.1)',
        duration: 0.8,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(radialLight, {
        opacity: 0.1,
        scale: 0.5,
        filter: 'blur(20px)',
        duration: 0.8,
        ease: 'power2.out'
      });
      
      gsap.to(content, {
        opacity: 0.3,
        duration: 0.6,
        ease: 'power2.out'
      });

      gsap.to(border, {
        opacity: 0.2,
        boxShadow: '0 0 10px rgba(0, 255, 255, 0.1)',
        duration: 0.8,
        ease: 'power2.out'
      });
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full bg-black text-white py-16 h-[60vh] relative overflow-hidden"
    >
      {/* Radial Neon Background */}
      <div 
        ref={radialLightRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 255, 255, 0.3) 0%, rgba(0, 255, 255, 0.1) 40%, rgba(0, 0, 0, 0.8) 70%, rgba(0, 0, 0, 1) 100%)',
          transition: 'all 0.8s ease'
        }}
      />

      {/* Neon Border */}
      <div 
        ref={borderRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          border: '2px solid rgba(0, 255, 255, 0.3)',
          borderRadius: '8px',
          transition: 'all 0.8s ease'
        }}
      />
      
      <div ref={contentRef} className="container mx-auto px-4 relative z-10">
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
            <p className="text-center text-gray-300 max-w-md leading-relaxed mb-6">
              We're always in search for talented and motivated people. Don't be shy introduce yourself!
            </p>
            <Link 
              href="/signin"
              className="px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/50 inline-block"
              style={{
                border: '2px solid rgba(0, 255, 255, 0.8)',
                color: 'rgba(0, 255, 255, 0.8)',
                backgroundColor: 'transparent'
              }}
            >
              Get Started
            </Link>
          </div>
          
          {/* Right Half */}
          <div className="w-1/2 flex mt-[13vh]">
            {/* First div with equal width */}
            <div className="w-1/2 p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Our Company</h3>
              <div className="flex flex-col space-y-2">
                <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Contact Us</a>
                <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Placement</a>
                <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Log</a>
                <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Courses</a>
                <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Terms and Conditions</a>
              </div>
            </div>
            
            {/* Second div with equal width */}
            <div className="w-1/2 p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Get Contact</h3>
              <div className="flex flex-col space-y-2">
                <p className="text-gray-300">Phone: +91 9876543210</p>
                <p className="text-gray-300">Email: info@nextladder.com</p>
                <p className="text-gray-300">Location: Mumbai, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
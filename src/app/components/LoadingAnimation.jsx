'use client';
import { useState, useEffect } from 'react';

const LoadingAnimation = ({ onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  
  const fullText = "Welcome To Next Ladder";
  const typingSpeed = 120; // milliseconds per character
  const cursorBlinkSpeed = 500; // milliseconds

  useEffect(() => {
    // Start fade in animation
    const fadeTimer = setTimeout(() => {
      setFadeIn(true);
    }, 100);

    // Show progress bar after a short delay
    const progressTimer = setTimeout(() => {
      setShowProgress(true);
    }, 500);

    // Typewriter effect
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timer);
    } else {
      // Text is complete, call onComplete immediately
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 100); // Small delay for visual effect
      return () => clearTimeout(completeTimer);
    }
  }, [currentIndex, fullText, typingSpeed, onComplete]);

  // Cursor blink effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, cursorBlinkSpeed);
    return () => clearInterval(cursorTimer);
  }, [cursorBlinkSpeed]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative w-full max-w-lg flex flex-col items-center justify-center">
        {/* Animated dots */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2" style={{background: 'rgba(65,175,255,0.6)', borderRadius: '9999px'}}></div>
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-[#171717] font-orbitron tracking-wider text-reveal">
          Loading...
        </h1>
        {/* Blinking cursor */}
        <span className={`inline-block w-1 h-8`} style={{background: 'rgba(65,175,255,1)', marginLeft: '0.25rem', borderRadius: '2px', transition: 'opacity 0.2s'}}></span>
        {/* Loading dots */}
        <div className="flex justify-center space-x-2 mt-8">
          <div className="w-3 h-3" style={{background: 'rgba(65,175,255,1)', borderRadius: '9999px', animation: 'bounce 1s infinite'}}></div>
          <div className="w-3 h-3" style={{background: 'rgba(65,175,255,0.7)', borderRadius: '9999px', animation: 'bounce 1s infinite', animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3" style={{background: 'rgba(65,175,255,0.5)', borderRadius: '9999px', animation: 'bounce 1s infinite', animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation; 
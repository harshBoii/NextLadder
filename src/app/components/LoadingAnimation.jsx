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
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full loading-particle opacity-60"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full loading-particle opacity-40" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-purple-400 rounded-full loading-particle opacity-50" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-indigo-400 rounded-full loading-particle opacity-30" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full loading-particle opacity-40" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-yellow-400 rounded-full loading-particle opacity-50" style={{ animationDelay: '2.5s' }}></div>
        </div>
        
        {/* Main text container */}
        <div className="relative z-10 text-center fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold text-white font-orbitron tracking-wider text-reveal">
            <span className="inline-block">
              {displayText}
              <span className={`inline-block w-1 h-8 bg-cyan-400 ml-1 transition-opacity duration-200 ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
            </span>
          </h1>
          
          {/* Loading dots */}
          <div className="mt-8 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          
          {/* Progress bar */}
          {showProgress && (
            <div className="mt-6 flex flex-col items-center">
              <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${(currentIndex / fullText.length) * 100}%` }}
                ></div>
              </div>
              
              {/* Loading percentage */}
              <div className="mt-2 text-cyan-400 text-sm font-share-tech-mono">
                {Math.round((currentIndex / fullText.length) * 100)}%
              </div>
            </div>
          )}
        </div>
        
        {/* Glowing border effect */}
        <div className="absolute inset-0 border-2 border-cyan-400 rounded-lg opacity-20 animate-pulse"></div>
        
        {/* Additional decorative elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg"></div>
        <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg"></div>
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-400 rounded-bl-lg"></div>
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-400 rounded-br-lg"></div>
      </div>
    </div>
  );
};

export default LoadingAnimation; 
"use client";

import React, { useState, useCallback, useRef } from 'react';
import { useSpring, animated as a } from 'react-spring';
import { useGesture } from 'react-use-gesture';

// fetch('https://api.nextladder.com/courses')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('Error fetching courses:', error);
//   });

const cardsData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    title: "Web Development Bootcamp",
    description: "Learn full-stack web development from scratch. Master HTML, CSS, JavaScript, and modern frameworks.",
    hours: 24,
    students: 1234,
    color: '#FFADAD'
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692", 
    title: "Data Science Fundamentals",
    description: "Introduction to data science, statistics, and machine learning concepts for beginners.",
    hours: 18,
    students: 856,
    color: '#FFD6A5'
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0",
    title: "UI/UX Design Masterclass",
    description: "Master the principles of user interface and user experience design with practical projects.",
    hours: 32,
    students: 2103,
    color: '#FDFFB6'
  }
];

export default function SwipeableCardDeck() {
  const [cards, setCards] = useState(cardsData);

  const handleSwipe = useCallback((id) => {
    setCards((prev) => prev.filter(card => card.id !== id));
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {cards.map((card, index) => (
        <SwipeableCard
          key={`card-${card.id}`}
          data={card}
          onSwipe={handleSwipe}
          offset={cards.length - 1 - index}
        />
      ))}
    </div>
  );
}

function SwipeableCard({ data, onSwipe, offset }) {
  const swipedRef = useRef(false);
  const initialX = -offset * 20;
  const initialRot = -offset * 5;

  const [{ x, y, rot, scale, opacity }, api] = useSpring(() => ({
    x: initialX,
    y: 0,
    rot: initialRot,
    scale: 1,
    opacity: 1,
    config: { tension: 300, friction: 30 },
  }));

  const bind = useGesture(
    {
      onDrag: ({ down, movement: [mx, my], direction: [dx], velocity }) => {
        const trigger = velocity > 0.2;
        const dir = dx < 0 ? -1 : 1;
        if (!down && trigger && !swipedRef.current) {
          swipedRef.current = true;
          api.start({
            x: initialX + dir * 500,
            rot: initialRot + dir * 45,
            scale: 1,
            y: my,
            opacity: 0,
            onRest: () => onSwipe(data.id)
          });
        } else {
          api.start({
            x: down ? initialX + mx : initialX,
            y: down ? my : 0,
            rot: down ? initialRot + mx / 10 : initialRot,
            scale: down ? 1.1 : 1,
            opacity: 1,
          });
        }
      },
    },
    { drag: { filterTaps: true, bounds: { top: 0 }, rubberband: true } }
  );

  return (
    <a.div
      {...bind()}
      style={{
        x,
        y,
        rotateZ: rot,
        scale,
        opacity,
        touchAction: 'none',
        zIndex: offset,
        background: 'white',
      }}
      className="absolute w-72 h-96 will-change-transform rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="w-full h-40 bg-white p-4">
        <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden">
          <img 
            src={data.image} 
            alt={data.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-serif font-semibold text-center text-xl mb-2">{data.title}</h3>
        <p className="font-sans text-sm text-gray-600 mb-4 opacity-75 line-clamp-2 pt-6 ">{data.description}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <div className="flex items-center pt-8">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {data.hours} hours
          </div>
          <div className="flex items-center pt-8">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {data.students} Students
          </div>
        </div>
      </div>
    </a.div>
  );
}

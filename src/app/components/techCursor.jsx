// components/TechCursorWithTrail.js
"use client";

import { useEffect, useRef, useState } from "react";

export default function TechCursorWithTrail() {
  const cursorRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [trail, setTrail] = useState([]);
  const maxTrail = 12; // number of dots in the trail

  useEffect(() => {
    const move = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      // update main cursor position
      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      // update trail positions
      setTrail((prev) => {
        const next = [...prev, { x, y }];
        // keep only the last maxTrail positions
        return next.length > maxTrail ? next.slice(next.length - maxTrail) : next;
      });
    };

    const enter = () => setVisible(true);
    const leave = () => {
      setVisible(false);
      setTrail([]); // clear trail when leaving window
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mouseleave", leave);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <>
      {/* Trail */}
      {trail.map((pos, i) => (
        <div
          key={i}
          className="tech-cursor__trail"
          style={{
            transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
            opacity: (i + 1) / maxTrail,           // fade out
            width: 4 + (i / maxTrail) * 6 + "px",  // smaller near the tail
            height: 4 + (i / maxTrail) * 6 + "px",
          }}
        />
      ))}

      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`tech-cursor ${visible ? "tech-cursor--visible" : ""}`}
      >
        <div className="tech-cursor__inner" />
        <div className="tech-cursor__outer" />
      </div>
    </>
  );
}

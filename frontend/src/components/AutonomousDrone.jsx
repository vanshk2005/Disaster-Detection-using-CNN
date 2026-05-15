import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useAnimationFrame } from 'framer-motion';

export default function AutonomousDrone() {
  const [mousePos, setMousePos] = useState({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const springX = useSpring(mousePos.x, { stiffness: 50, damping: 15, mass: 1.5 });
  const springY = useSpring(mousePos.y, { stiffness: 50, damping: 15, mass: 1.5 });

  const [rotation, setRotation] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX);
      springY.set(e.clientY);

      const target = e.target;
      setIsHovering(
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a')
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [springX, springY]);

  useAnimationFrame(() => {
    const currX = springX.get();
    const currY = springY.get();

    const dx = mousePos.x - currX;
    const dy = mousePos.y - currY;


    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
      const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
      setRotation(targetAngle);
    }
  });

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        rotate: rotation + 90,
      }}
      className="fixed top-0 left-0 z-0 pointer-events-none mix-blend-screen -ml-8 -mt-8"
    >
      <motion.div
        animate={{ scale: isHovering ? 1.2 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-16 h-16 flex justify-center items-center drop-shadow-[0_0_20px_rgba(20,184,166,0.6)]"
      >

        <div className="absolute w-5 h-5 bg-primary-500 rounded-full blur-[2px]" />
        <div className="absolute w-2 h-2 bg-white rounded-full shadow-lg" />


        <motion.div
          animate={{ height: isHovering ? 40 : 25, opacity: isHovering ? 0.8 : 0.4 }}
          className="absolute bottom-[-15px] w-2 bg-gradient-to-t from-transparent via-cyan-400 to-white rounded-b-full blur-[3px] origin-top"
        />


        <svg viewBox="0 0 100 100" className="w-20 h-20 absolute -top-2 drop-shadow-lg">

          <polygon points="50,10 85,75 50,60 15,75" fill="rgba(20, 184, 166, 0.15)" stroke="#2dd4bf" strokeWidth="2" strokeLinejoin="round" />


          <polygon points="50,25 65,65 50,55 35,65" fill="rgba(20, 184, 166, 0.4)" stroke="#fff" strokeWidth="1" />


          <circle cx="15" cy="75" r="4" fill="#0f172a" stroke="#2dd4bf" strokeWidth="1.5" />
          <circle cx="85" cy="75" r="4" fill="#0f172a" stroke="#2dd4bf" strokeWidth="1.5" />
        </svg>


        <motion.div
          animate={{ rotate: isHovering ? 180 : 360, scale: isHovering ? 1.4 : 1 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-primary-500/30 rounded-full border-dashed"
        />

        <div className="absolute top-12 whitespace-nowrap -rotate-90 origin-center text-primary-400 opacity-50 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(45,212,191,0.2)]">
          <span className="text-[6px] font-mono tracking-[0.2em] font-bold">
            {isHovering ? "TARGET_LOCK" : "SCANNING"}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

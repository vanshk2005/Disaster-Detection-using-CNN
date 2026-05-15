import React, { useEffect, useState } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

export default function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const tag = e.target.tagName;
      const isClickable = ['A', 'BUTTON', 'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'INPUT', 'LABEL', 'IMG'].includes(tag);
      const hasPointer = window.getComputedStyle(e.target).cursor === 'pointer';


      if (isClickable || hasPointer) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    }
  }, []);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.2 };
  const cursorX = useSpring(mousePosition.x, springConfig);
  const cursorY = useSpring(mousePosition.y, springConfig);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden mix-blend-screen px-4">

      <motion.div
        className="absolute w-2 h-2 bg-primary-400 rounded-full shadow-[0_0_15px_6px_rgba(45,212,191,0.6)]"
        style={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
      />


      <motion.div
        className="absolute rounded-full border-[1.5px] border-primary-400 flex items-center justify-center pointer-events-none"
        initial={{ width: 36, height: 36 }}
        animate={{
          width: isHovering ? 120 : 36,
          height: isHovering ? 120 : 36,
          backgroundColor: isHovering ? 'transparent' : 'rgba(45, 212, 191, 0.1)',
          boxShadow: isHovering
            ? '0 0 40px 5px rgba(45,212,191,0.2), inset 0 0 20px 2px rgba(45,212,191,0.2)'
            : '0 0 20px 2px rgba(45,212,191,0.3)',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <AnimatePresence>
          {isHovering && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[12px] tracking-[0.2em] text-primary-300 font-bold uppercase drop-shadow-[0_0_8px_rgba(45,212,191,0.8)]"
            >
              Focus
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Ambient glow - optimized for performance */}
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full bg-primary-600/5 blur-[50px]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform'
        }}
      />
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';

export default function AnimatedRabbit() {
  return (
    <motion.div
      className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Rabbit Body */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Left Ear */}
          <motion.ellipse
            cx="70"
            cy="40"
            rx="15"
            ry="45"
            fill="#FFB6C1"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ originX: '70px', originY: '85px' }}
          />
          <ellipse cx="70" cy="45" rx="8" ry="30" fill="#FFC0CB" />

          {/* Right Ear */}
          <motion.ellipse
            cx="130"
            cy="40"
            rx="15"
            ry="45"
            fill="#FFB6C1"
            animate={{ rotate: [5, -5, 5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ originX: '130px', originY: '85px' }}
          />
          <ellipse cx="130" cy="45" rx="8" ry="30" fill="#FFC0CB" />

          {/* Head */}
          <circle cx="100" cy="100" r="45" fill="#FFB6C1" />

          {/* Left Eye */}
          <motion.circle
            cx="85"
            cy="95"
            r="6"
            fill="#2C3E50"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          />

          {/* Right Eye */}
          <motion.circle
            cx="115"
            cy="95"
            r="6"
            fill="#2C3E50"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          />

          {/* Nose */}
          <ellipse cx="100" cy="110" rx="5" ry="4" fill="#FF69B4" />

          {/* Mouth */}
          <path
            d="M 100 110 Q 90 118 85 115"
            stroke="#2C3E50"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 100 110 Q 110 118 115 115"
            stroke="#2C3E50"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Body */}
          <ellipse cx="100" cy="160" rx="35" ry="30" fill="#FFB6C1" />

          {/* Left Arm */}
          <motion.ellipse
            cx="70"
            cy="155"
            rx="12"
            ry="25"
            fill="#FFB6C1"
            animate={{ rotate: [-10, 10, -10] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ originX: '70px', originY: '155px' }}
          />

          {/* Right Arm */}
          <motion.ellipse
            cx="130"
            cy="155"
            rx="12"
            ry="25"
            fill="#FFB6C1"
            animate={{ rotate: [10, -10, 10] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ originX: '130px', originY: '155px' }}
          />

          {/* Tail */}
          <motion.circle
            cx="100"
            cy="185"
            r="12"
            fill="#FFF"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </svg>
      </div>

      {/* Floating hearts */}
      <motion.div
        className="absolute -top-4 -right-4 text-2xl"
        animate={{
          y: [-10, -30, -10],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 0.5,
        }}
      >
        💕
      </motion.div>
    </motion.div>
  );
}

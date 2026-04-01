import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles } from 'lucide-react';

export default function AegisNavbar({ activeTab, onLaunch }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full p-6 md:px-12 z-50 pointer-events-none flex justify-between items-center"
    >
      <a 
        href="/"
        className="flex items-center gap-4 pointer-events-auto hover:opacity-80 transition-opacity cursor-pointer group"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="relative text-primary-400 flex items-center justify-center p-3 sm:p-4 bg-dark-900/60 rounded-2xl border border-white/10 backdrop-blur-md shadow-[0_0_30px_rgba(20,184,166,0.15)]"
        >
          <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" strokeWidth={1.5} />
          
          <motion.div 
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-primary-500/30 blur-2xl rounded-full"
          />
          
          <motion.div 
            animate={{ rotate: -720 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 border border-primary-500/20 rounded-full border-dashed"
          />
        </motion.div>
        
        <div className="flex flex-col tracking-tight">
          <h1 className="text-3xl sm:text-4xl font-black font-outfit text-white drop-shadow-lg flex items-center">
            AEGIS
            <span className="text-primary-500 font-light ml-2 opacity-90 drop-shadow-[0_0_10px_rgba(20,184,166,0.5)]">AI</span>
            <Sparkles className="w-5 h-5 text-yellow-400 ml-2 animate-pulse" />
          </h1>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-primary-200/50 font-bold ml-1 mt-0.5">
            Planetary Defense Protocol
          </span>
        </div>
      </a>

      {activeTab === 'home' && (
        <motion.button
          onClick={(e) => { e.preventDefault(); onLaunch(); }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group px-6 py-2.5 bg-dark-900 border border-primary-500/30 text-primary-400 font-bold uppercase tracking-[0.2em] text-xs sm:text-sm rounded-lg overflow-hidden pointer-events-auto shadow-[0_0_20px_rgba(20,184,166,0.15)]"
        >
          {/* Scanning Line Background */}
          <div className="absolute inset-0 w-0 bg-primary-500/20 group-hover:w-full transition-all duration-700 ease-out" />
          
          {/* Cyberpunk Glitch accent */}
          <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-primary-500 group-hover:bg-white animate-pulse" />
          <div className="absolute top-0 bottom-0 right-0 w-[3px] bg-primary-500 group-hover:bg-white animate-pulse" />
          
          <span className="relative z-10 font-outfit flex items-center gap-2 group-hover:text-white transition-colors duration-300">
            [ SYSTEM.INIT ] <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </motion.button>
      )}
    </motion.div>
  );
}

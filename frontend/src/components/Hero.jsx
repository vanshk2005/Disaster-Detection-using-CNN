import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Activity, BrainCircuit } from 'lucide-react';

export default function Hero() {
  return (
    <div className="w-full flex md:flex-row flex-col items-center justify-between gap-12 pt-10 pb-8 z-10 relative">

      <div className="flex-1 text-left">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(20,184,166,0.2)]"
        >
          Real-World Impact
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight font-outfit text-white leading-tight"
        >
          Faster Response.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-500 drop-shadow-md">
            Saves Lives.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 text-lg text-gray-400 max-w-xl leading-relaxed"
        >
          When disaster strikes, thousands of buildings are compromised. Instead of humans slowly and inconsistently verifying 1,000+ drone images manually—our Convolutional Neural Network (CNN) provides <strong className="text-white font-semibold">fast, consistent, and highly scalable</strong> damage detection.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div className="flex items-center gap-3 text-sm text-gray-300 bg-dark-900/80 px-5 py-3 rounded-xl border border-red-500/10 shadow-lg">
            <span className="text-red-400 font-bold flex items-center gap-2">
              <span className="text-lg">❌</span> Humans
            </span>
            <span className="text-gray-500 font-mono text-xs uppercase tracking-wider">→ Slow, Inconsistent</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-300 bg-dark-900/80 px-5 py-3 rounded-xl border border-primary-500/30 shadow-[0_0_20px_rgba(20,184,166,0.15)] ring-1 ring-primary-500/20">
            <span className="text-primary-400 font-bold flex items-center gap-2">
              <span className="text-lg">✅</span> CNN AI
            </span>
            <span className="text-gray-400 font-mono text-xs uppercase tracking-wider">→ Fast, Scalable</span>
          </div>
        </motion.div>
      </div>


      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex-1 w-full max-w-md pt-8 md:pt-0"
      >
        <div className="glass rounded-3xl p-8 relative overflow-hidden group hover:border-primary-500/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(45,212,191,0.1)]">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-500/20 rounded-full blur-[60px] pointer-events-none group-hover:bg-primary-500/30 transition-colors" />

          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="p-3.5 bg-dark-900 rounded-2xl border border-white/10 shadow-inner group-hover:border-primary-500/50 transition-colors">
              <BrainCircuit className="w-7 h-7 text-primary-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-outfit text-white leading-tight">What CNN Actually Does</h3>
              <p className="text-xs text-primary-400 font-mono tracking-[0.15em] uppercase mt-1">Pattern Detector</p>
            </div>
          </div>

          <div className="space-y-6 relative z-10">
            {[
              { icon: Activity, title: 'Sees Image Pixels', desc: 'Reads the raw matrix of coordinates' },
              { icon: Target, title: 'Detects Edges', desc: 'Identifies basic contrasting lines' },
              { icon: Zap, title: 'Recognizes Shapes', desc: 'Learns to find walls, cracks, & debris' },
              { icon: BrainCircuit, title: 'Combines & Decides', desc: 'Combines structural patterns to classify damage instantly' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + (i * 0.15) }}
                className="flex items-start gap-4 relative"
              >

                {i !== 3 && <div className="absolute left-[11px] top-[24px] bottom-[-24px] w-[2px] bg-gradient-to-b from-primary-500/20 to-transparent" />}

                <div className="mt-0.5 p-1 rounded-full bg-dark-900 border border-white/10 text-gray-500 group-hover:text-primary-400 group-hover:border-primary-500/30 transition-all duration-500 z-10 relative">
                  <step.icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-gray-200">{step.title}</h4>
                  <p className="text-[13px] text-gray-500 mt-0.5 leading-snug">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

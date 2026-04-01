import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import LiveMonitor from './components/LiveMonitor';
import MouseFollower from './components/MouseFollower';
import HistoricalArchive from './components/HistoricalArchive';
import AegisNavbar from './components/AegisNavbar';
import AutonomousDrone from './components/AutonomousDrone';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'live', 'manual', 'history'

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden font-inter selection:bg-primary-500/30 relative">
      <AegisNavbar activeTab={activeTab} onLaunch={() => setActiveTab('live')} />
      <MouseFollower />
      <AutonomousDrone />

      {/* Background ambient lighting */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-12 flex flex-col items-center justify-center min-h-screen">
        
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div 
              key="hero-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col items-center"
            >
              <Hero />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {activeTab !== 'home' && (
            <motion.div 
              key="dashboard-view"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full relative z-20 flex flex-col items-center"
            >
              {/* Tabs toggle */}
              <div className="flex bg-dark-800/80 p-1.5 rounded-full backdrop-blur-md border border-white/5 flex-wrap justify-center gap-2 shadow-2xl">
                <button 
                  onClick={() => setActiveTab('live')}
                  className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                    activeTab === 'live' ? 'bg-primary-500 text-dark-900 shadow-[0_0_15px_rgba(20,184,166,0.5)]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Live Global Monitoring
                </button>
                <button 
                  onClick={() => setActiveTab('history')}
                  className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                    activeTab === 'history' ? 'bg-primary-500 text-dark-900 shadow-[0_0_15px_rgba(20,184,166,0.5)]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Historical Archive
                </button>
                <button 
                  onClick={() => setActiveTab('manual')}
                  className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                    activeTab === 'manual' ? 'bg-primary-500 text-dark-900 shadow-[0_0_15px_rgba(20,184,166,0.5)]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Manual Inspection
                </button>
              </div>

              <div className="w-full mt-10 relative">
                {activeTab === 'live' && <LiveMonitor />}
                {activeTab === 'history' && <HistoricalArchive />}
          
                {activeTab === 'manual' && (
                  <div className="flex flex-col items-center">
                    <div className="w-full max-w-4xl">
                      <UploadSection onPrediction={setPrediction} />
                    </div>

                    <AnimatePresence>
                      {prediction && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -20 }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          className="mt-12 w-full max-w-lg"
                        >
                          <div className="glass rounded-2xl p-8 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent pointer-events-none" />
                              {/* Analysis Result Header */}
                              <h3 className="text-xl text-gray-400 font-medium mb-2 relative z-10">Analysis Result</h3>
                              <div className="text-4xl font-bold text-white mb-2 relative z-10 font-outfit drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                                {prediction.class.replace('_', ' ')}
                              </div>
                              <div className="mb-8 text-primary-400 font-bold uppercase tracking-widest text-xs relative z-10">
                                Confidence Level: {(prediction.confidence * 100).toFixed(1)}%
                              </div>
                              
                              {/* Probability Distribution Graph */}
                              <div className="relative z-10 w-full mt-6 space-y-4">
                                <h4 className="text-[10px] text-gray-500 uppercase tracking-[0.2em] text-left mb-3">Probability Distribution Matrix</h4>
                                
                                {prediction.probabilities ? (
                                  Object.entries(prediction.probabilities)
                                    .sort(([,a], [,b]) => b - a)
                                    .map(([className, prob], idx) => (
                                    <div key={className} className="flex flex-col gap-1.5">
                                      <div className="flex justify-between text-xs font-semibold tracking-wide">
                                        <span className={idx === 0 ? "text-primary-400" : "text-gray-400"}>
                                          {className.replace('_', ' ')}
                                        </span>
                                        <span className={idx === 0 ? "text-primary-400" : "text-gray-500"}>
                                          {(prob * 100).toFixed(1)}%
                                        </span>
                                      </div>
                                      <div className="w-full bg-dark-900/80 rounded-full h-1.5 overflow-hidden shadow-inner flex border border-white/5">
                                        <motion.div 
                                          initial={{ width: 0 }}
                                          animate={{ width: `${prob * 100}%` }}
                                          transition={{ duration: 1.2, delay: 0.3 + (idx * 0.15), type: "spring" }}
                                          className={`h-full rounded-full ${
                                            idx === 0 ? 'bg-gradient-to-r from-primary-600 to-cyan-400 shadow-[0_0_12px_rgba(45,212,191,0.8)]' 
                                            : className.includes('Damage') ? 'bg-orange-500/50' 
                                            : 'bg-gray-600'
                                          }`}
                                        />
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className="text-sm text-gray-400 text-left">Processing graph data...</div>
                                )}
                              </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </div>
  )
}

export default App

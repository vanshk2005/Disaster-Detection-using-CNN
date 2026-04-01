import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, MapPin, ExternalLink, ShieldAlert, Loader2 } from 'lucide-react';

export default function LiveMonitor() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLiveAlerts = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8000/live-alerts/');
      const data = await res.json();
      if (data.events) {
        setAlerts(data.events);
      }
    } catch (err) {
      console.error("Error fetching live alerts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveAlerts();

    const interval = setInterval(fetchLiveAlerts, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full relative z-10 glass rounded-3xl p-6 md:p-10 mx-auto mt-10">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
        <div>
          <h2 className="text-3xl font-outfit font-bold flex items-center">
            <Activity className="w-8 h-8 mr-3 text-red-500 animate-pulse" />
            Global Live Monitoring
          </h2>
          <p className="text-gray-400 mt-2">Automated planetary tracking via GDACS Satellite Relays.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchLiveAlerts}
          className="px-6 py-2 bg-dark-800 border border-white/10 rounded-full text-sm font-medium hover:bg-dark-700 transition-colors flex items-center"
        >
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Refresh Connect"}
        </motion.button>
      </div>

      {loading && alerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-primary-500 animate-spin mb-4" />
          <p className="text-gray-400">Syncing with orbital data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {alerts.map((alert, idx) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-dark-900/60 border border-white/5 rounded-2xl overflow-hidden hover:border-primary-500/50 transition-colors group"
              >
                <div className="h-56 relative overflow-hidden flex-shrink-0">
                  <img
                    src={alert.ai_analysis.satellite_image_url}
                    alt="Satellite view"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-80" />
                  <div className="absolute top-4 right-4 bg-dark-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                    <ShieldAlert className="w-3 h-3 text-primary-400 mr-1.5" />
                    AI: {alert.ai_analysis.class.replace('_', ' ')}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center text-xs text-primary-400 mb-2 font-medium">
                    <MapPin className="w-3 h-3 mr-1" />
                    {alert.latitude.toFixed(2)}, {alert.longitude.toFixed(2)} • {alert.type}
                  </div>
                  <h3 className="text-lg font-bold font-outfit mb-2 line-clamp-2">{alert.title}</h3>
                  <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
                    <span>{new Date(alert.date).toLocaleDateString()}</span>
                    <span className="text-white font-medium">Conf: {(alert.ai_analysis.confidence * 100).toFixed(1)}%</span>
                  </div>
                  {alert.link && (
                    <a href={alert.link} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center text-sm text-primary-500 hover:text-primary-400">
                      View Source <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, MapPin, ExternalLink, ShieldAlert, Loader2, Search } from 'lucide-react';

function ImageRotator({ images }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setIdx((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="absolute inset-0 w-full h-full bg-dark-900">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt="Disaster imagery"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out"
          style={{ opacity: i === idx ? 1 : 0, transform: i === idx ? 'scale(1)' : 'scale(1.05)', willChange: 'opacity, transform' }}
        />
      ))}
    </div>
  );
}

export default function HistoricalArchive() {
  const [archives, setArchives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchArchives = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8000/historical-disasters/');
      const data = await res.json();
      if (data.events) {
        setArchives(data.events);
      }
    } catch (err) {
      console.error("Error fetching historical archives", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchives();
  }, []);

  const searchTokens = searchTerm.toLowerCase().split(' ').filter(t => t.trim().length > 0);

  const filteredArchives = archives.filter(alert => {
    if (searchTokens.length === 0) return true;
    const content = `${alert.title} ${alert.description} ${alert.type}`.toLowerCase();


    return searchTokens.every(token => content.includes(token));
  });

  return (
    <div className="w-full relative z-10 glass rounded-3xl p-6 md:p-10 mx-auto mt-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-white/10 gap-6">
        <div>
          <h2 className="text-3xl font-outfit font-bold flex items-center">
            <History className="w-8 h-8 mr-3 text-primary-500" />
            Historical Global Archive
          </h2>
          <p className="text-gray-400 mt-2">Database of disastrous events across the past century, auto-updating with new occurrences.</p>
        </div>

        <div className="relative w-full md:w-auto min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search disasters, regions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-dark-900/80 border border-white/10 rounded-full focus:outline-none focus:border-primary-500/50 text-white placeholder:text-gray-500 transition-colors"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-primary-500 animate-spin mb-4" />
          <p className="text-gray-400">Accessing Historical Databanks...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredArchives.length === 0 ? (
              <div className="col-span-full py-12 text-center text-gray-500">
                No matching historical records found.
              </div>
            ) : (
              filteredArchives.map((alert, idx) => {
                const images = alert.ai_analysis.satellite_image_urls || [alert.ai_analysis.satellite_image_url];
                return (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-dark-900/60 border border-white/5 rounded-2xl overflow-hidden hover:border-primary-500/50 transition-colors group flex flex-col hover:shadow-[0_0_30px_rgba(45,212,191,0.1)]"
                  >
                    <div className="h-56 relative overflow-hidden flex-shrink-0">

                      <ImageRotator images={images} />

                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent opacity-90 z-10" />

                      <div className="absolute top-4 right-4 bg-dark-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold flex items-center border border-white/10 z-20 shadow-lg">
                        <ShieldAlert className="w-3 h-3 text-primary-400 mr-1.5" />
                        AI: {alert.ai_analysis.class.replace('_', ' ')}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col relative -mt-10 z-20">
                      <div className="bg-dark-800 border border-white/10 rounded-2xl p-5 shadow-xl flex-1 flex flex-col backdrop-blur-sm">
                        <div className="flex items-center text-xs text-primary-400 mb-2 font-medium">
                          <MapPin className="w-3 h-3 mr-1" />
                          {alert.latitude.toFixed(2)}, {alert.longitude.toFixed(2)} • {alert.type}
                        </div>
                        <h3 className="text-xl font-bold font-outfit mb-3 text-white leading-tight">{alert.title}</h3>
                        <p className="text-sm text-gray-400 mb-4 line-clamp-4 leading-relaxed flex-1">
                          {alert.description}
                        </p>

                        <div className="pt-4 border-t border-white/5 flex justify-between items-center mt-auto">
                          <span className="text-xs text-gray-500 font-mono tracking-wider">
                            {new Date(alert.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                          </span>
                          {alert.link && (
                            <a href={alert.link} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-semibold text-primary-500 hover:text-primary-400 transition-colors">
                              Details <ExternalLink className="w-4 h-4 ml-1.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

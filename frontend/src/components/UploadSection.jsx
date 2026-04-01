import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Image as ImageIcon, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function UploadSection({ onPrediction }) {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setError("Please upload a valid image file.");
      return;
    }
    setError(null);
    setPreview(URL.createObjectURL(file));
    setLoading(true);
    onPrediction(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/predict/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      onPrediction(data);
    } catch (err) {
      setError(err.message || "Failed to analyze image.");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div 
        className={`relative glass rounded-3xl p-1 md:p-2 transition-all duration-300 ${dragActive ? 'scale-[1.02] shadow-primary-500/20' : 'hover:shadow-white/5'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className={`absolute inset-0 rounded-3xl border-2 border-dashed transition-colors duration-300 ${dragActive ? 'border-primary-500' : 'border-white/10'} pointer-events-none`} />
        
        <div className="relative w-full min-h-[300px] flex flex-col items-center justify-center p-8 rounded-[22px] bg-dark-900/50 backdrop-blur-sm overflow-hidden">
          
          {preview && !loading && !error && (
            <motion.img 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              src={preview} 
              className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-sm" 
              alt="preview bg" 
            />
          )}

          <div className="z-10 flex flex-col items-center text-center">
            {loading ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="flex flex-col items-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-500 rounded-full blur-md opacity-20 animate-pulse" />
                  <Loader2 className="w-16 h-16 text-primary-400 animate-spin relative pointer-events-none" />
                </div>
                <p className="mt-6 text-lg font-medium text-white">Analyzing Imagery...</p>
                <p className="text-sm text-gray-400 mt-2">Running through CNN architecture</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 mb-6 rounded-full bg-dark-800 flex items-center justify-center border border-white/5 shadow-inner overflow-hidden">
                  {preview && !error ? (
                    <img src={preview} alt="Thumb" className="w-full h-full object-cover" />
                  ) : (
                    <UploadCloud className="w-10 h-10 text-primary-500" />
                  )}
                </div>
                <h3 className="text-2xl font-semibold mb-2 font-outfit">
                  {preview ? 'Upload another image' : 'Upload Scene Image'}
                </h3>
                <p className="text-gray-400 mb-8 max-w-sm">
                  Drag and drop an image or click to browse. Supported formats: JPEG, PNG
                </p>
                
                <input
                  ref={inputRef}
                  type="file"
                  className="hidden"
                  accept="image/jpeg, image/png"
                  onChange={handleChange}
                />
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => inputRef.current.click()}
                  className="px-8 py-3 bg-white text-dark-900 font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-lg shadow-white/10"
                >
                  Select File
                </motion.button>
              </motion.div>
            )}

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex items-center text-red-400 bg-red-400/10 px-4 py-2 rounded-lg"
              >
                <AlertCircle className="w-5 h-5 mr-2" />
                <span>{error}</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

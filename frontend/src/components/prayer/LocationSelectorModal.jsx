import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Navigation, X, Loader2, AlertCircle, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from '../../context/LocationContext';
import { locationAPI } from '../../services/api';
import Button from '../common/Button';

const QUICK_CITIES = [
  { city: 'Makkah', country: 'Saudi Arabia', latitude: 21.4225, longitude: 39.8262 },
  { city: 'Madinah', country: 'Saudi Arabia', latitude: 24.5247, longitude: 39.5692 },
  { city: 'Jerusalem', country: 'Palestine', latitude: 31.7683, longitude: 35.2137 },
  { city: 'Cairo', country: 'Egypt', latitude: 30.0444, longitude: 31.2357 },
  { city: 'Istanbul', country: 'Turkey', latitude: 41.0082, longitude: 28.9784 },
  { city: 'Dhaka', country: 'Bangladesh', latitude: 23.8103, longitude: 90.4125 },
  { city: 'Karachi', country: 'Pakistan', latitude: 24.8607, longitude: 67.0011 },
  { city: 'London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278 },
  { city: 'New York', country: 'United States', latitude: 40.7128, longitude: -74.006 },
  { city: 'Kuala Lumpur', country: 'Malaysia', latitude: 3.139, longitude: 101.6869 },
];

export default function LocationSelectorModal({ isOpen, onClose }) {
  const { location, selectLocation, detectLocation, isDetecting, detectionError } = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const searchTimeoutRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced search
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSearchResults([]);
      setSearchError(null);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await locationAPI.search(searchQuery.trim());
        const results = response.data || [];
        setSearchResults(results);
        if (results.length === 0) {
          setSearchError('No matching cities found. Try searching for a major nearby city or country.');
        }
      } catch {
        setSearchError('Could not reach geocoding service. Please check your network connection.');
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(searchTimeoutRef.current);
  }, [searchQuery]);

  const handleSelectCity = (cityItem) => {
    selectLocation(cityItem);
    onClose();
  };

  const handleDetect = async () => {
    try {
      await detectLocation();
      onClose();
    } catch {
      // Error is stored in detectionError from context
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="location-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 id="location-modal-title" className="text-base font-bold text-slate-900 dark:text-slate-100">
                    Select Location
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Accurate prayer times require your geographic coordinates
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close location selector"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Automatic Detection Action */}
              <div className="space-y-2">
                <Button
                  variant="primary"
                  size="md"
                  icon={Navigation}
                  isLoading={isDetecting}
                  onClick={handleDetect}
                  className="w-full justify-center"
                >
                  {isDetecting ? 'Detecting Your Location...' : 'Detect My Location Automatically'}
                </Button>

                {detectionError && (
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-300">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <span>{detectionError}</span>
                  </div>
                )}
              </div>

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                </div>
                <div className="relative px-3 bg-white dark:bg-slate-900 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Or Search Manually
                </div>
              </div>

              {/* City Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  {isSearching ? <Loader2 size={16} className="animate-spin text-emerald-600" /> : <Search size={16} />}
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type city name (e.g. Mecca, London, Dhaka)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Search Results List */}
              {searchResults.length > 0 && (
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800/60">
                  {searchResults.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectCity(item)}
                      className="w-full text-left px-4 py-3 hover:bg-emerald-50/60 dark:hover:bg-slate-800/70 transition-colors flex items-center justify-between group"
                    >
                      <div className="pr-2">
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                          {item.city}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-sm">
                          {item.displayName}
                        </p>
                      </div>
                      <MapPin size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-emerald-600 shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {searchError && (
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-2">
                  {searchError}
                </p>
              )}

              {/* Popular International Islamic Cities */}
              <div className="space-y-2.5 pt-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Quick Select
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_CITIES.map((c) => {
                    const isSelected =
                      location &&
                      location.city?.toLowerCase() === c.city.toLowerCase() &&
                      location.country?.toLowerCase() === c.country.toLowerCase();

                    return (
                      <button
                        key={c.city}
                        type="button"
                        onClick={() => handleSelectCity(c)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-transparent'
                        }`}
                      >
                        <span>{c.city}</span>
                        {isSelected && <Check size={12} className="text-emerald-600 dark:text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

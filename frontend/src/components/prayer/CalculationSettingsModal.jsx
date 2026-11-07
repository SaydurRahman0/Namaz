import { useState, useEffect } from 'react';
import { Sliders, X, Check, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from '../../context/LocationContext';
import { prayerTimesAPI } from '../../services/api';
import { CALCULATION_METHODS, ASR_METHODS } from '../../utils/constants';

export default function CalculationSettingsModal({ isOpen, onClose }) {
  const { method, school, updateMethod, updateSchool } = useLocation();

  const [methodsList, setMethodsList] = useState(CALCULATION_METHODS);
  const [loadingMethods, setLoadingMethods] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    let isMounted = true;
    setLoadingMethods(true);

    prayerTimesAPI
      .getMethods()
      .then((res) => {
        if (isMounted && res?.data && Array.isArray(res.data) && res.data.length > 0) {
          setMethodsList(res.data);
        }
      })
      .catch(() => {
        // Fallback to verified constants list
      })
      .finally(() => {
        if (isMounted) setLoadingMethods(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-modal-title"
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
                  <Sliders size={20} />
                </div>
                <div>
                  <h3 id="settings-modal-title" className="text-base font-bold text-slate-900 dark:text-slate-100">
                    Calculation Settings
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Configure regional astronomical methods and Asr juristic school
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close calculation settings"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Asr Juristic School Selection */}
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Asr Juristic Calculation (Fiqh School)
                  </label>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Determines the shadow length convention for the start of Asr.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ASR_METHODS.map((s) => {
                    const isSelected = school === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => updateSchool(s.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/30'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold">{s.name}</span>
                          {isSelected && <Check size={16} className="text-emerald-600 dark:text-emerald-400" />}
                        </div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                          {s.id === 1 ? 'Shadow = 2x object (Later Asr)' : 'Shadow = 1x object (Earlier Asr)'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Calculation Method Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="calculation-method-select" className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      Calculation Authority / Method
                    </label>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Specifies Fajr and Isha solar depression angles based on regional guidelines.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <select
                    id="calculation-method-select"
                    value={method}
                    onChange={(e) => updateMethod(e.target.value)}
                    disabled={loadingMethods}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  >
                    {methodsList.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name || m.code}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Educational Notice */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <Info size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <p>
                    Calculated timetables are based on standard astronomical criteria and may vary slightly by 1–2 minutes from individual local mosque schedules. Please confirm with your community when in doubt.
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-3 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-right">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-2xs transition-colors"
              >
                Apply &amp; Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


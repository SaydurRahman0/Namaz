import { useState } from 'react';
import { MapPin, Navigation, Search, AlertCircle, Compass } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { useLocation } from '../../context/LocationContext';
import LocationSelectorModal from './LocationSelectorModal';

export default function LocationPromptCard({ className = '' }) {
  const { detectLocation, isDetecting, detectionError } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card
        variant="elevated"
        padding="lg"
        className={`border-emerald-200 dark:border-emerald-800/60 bg-gradient-to-br from-white via-emerald-50/20 to-white dark:from-slate-800 dark:via-slate-800 dark:to-slate-850 text-center space-y-5 ${className}`}
      >
        <div className="w-14 h-14 rounded-2xl bg-emerald-100/80 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mx-auto shadow-2xs">
          <Compass size={28} />
        </div>

        <div className="max-w-md mx-auto space-y-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
            <MapPin size={12} />
            Location Required
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
            Set Your Prayer Location
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Islamic prayer times depend directly on your geographic coordinates and local solar cycle. Please detect your location automatically or search for your city.
          </p>
        </div>

        {detectionError && (
          <div className="max-w-md mx-auto p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-300 text-left">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{detectionError}</span>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <Button
            variant="primary"
            size="md"
            icon={Navigation}
            isLoading={isDetecting}
            onClick={() => detectLocation().catch(() => {})}
          >
            {isDetecting ? 'Detecting Location...' : 'Detect My Location'}
          </Button>

          <Button
            variant="outline"
            size="md"
            icon={Search}
            onClick={() => setIsModalOpen(true)}
          >
            Search City
          </Button>
        </div>
      </Card>

      <LocationSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}


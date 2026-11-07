import { useState, useEffect, useMemo } from 'react';
import { Clock, MapPin, Compass, Sparkles, SlidersHorizontal, AlertCircle } from 'lucide-react';
import Card from '../common/Card';
import { useLocation } from '../../context/LocationContext';
import { calculateNextPrayer, formatTime12h, PRAYER_DETAILS } from '../../utils/prayerTimeUtils';

export default function NextPrayerCard({
  timings = null,
  timezone = null,
  locationInfo = null,
  isLive = false,
  onOpenLocation = null,
  onOpenSettings = null,
  className = '',
}) {
  const { location, method, school } = useLocation();
  const activeLocation = locationInfo || location;

  const [calculationState, setCalculationState] = useState(() => {
    if (!timings) return null;
    return calculateNextPrayer(timings, timezone);
  });

  // Re-calculate every 1 second when live data is provided
  useEffect(() => {
    if (!timings || !isLive) {
      setCalculationState(null);
      return;
    }

    const tick = () => {
      const calculated = calculateNextPrayer(timings, timezone);
      setCalculationState(calculated);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [timings, timezone, isLive]);

  const nextPrayerObj = useMemo(() => {
    if (calculationState?.nextPrayer) {
      return calculationState.nextPrayer;
    }
    return PRAYER_DETAILS.fajr;
  }, [calculationState]);

  const displayTime = useMemo(() => {
    if (isLive && calculationState?.nextPrayerTime) {
      return formatTime12h(calculationState.nextPrayerTime);
    }
    return '--:--';
  }, [isLive, calculationState]);

  const countdownFormatted = useMemo(() => {
    if (isLive && calculationState?.timeRemaining) {
      return calculationState.timeRemaining.formatted;
    }
    return '--h --m --s';
  }, [isLive, calculationState]);

  const progressValue = useMemo(() => {
    if (isLive && calculationState?.progress !== undefined) {
      return calculationState.progress;
    }
    return 0;
  }, [isLive, calculationState]);

  return (
    <Card
      variant="elevated"
      padding="lg"
      className={`relative overflow-hidden border-emerald-200/90 dark:border-emerald-800/60 bg-gradient-to-br from-white via-emerald-50/20 to-white dark:from-slate-800 dark:via-slate-800 dark:to-slate-850 shadow-sm ${className}`}
    >
      {/* Decorative background glow */}
      <div
        className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-emerald-500/5 dark:bg-emerald-400/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Next Prayer Details */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/80 text-emerald-900 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <Sparkles size={13} className="text-emerald-600 dark:text-emerald-400" />
              Upcoming Prayer
            </span>

            {isLive ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Timetable
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50">
                <AlertCircle size={11} />
                Select Location to Activate
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {nextPrayerObj.nameEn}
            </h3>
            <span className="arabic-text text-xl sm:text-2xl text-emerald-700 dark:text-emerald-400 font-semibold" lang="ar">
              {nextPrayerObj.nameAr}
            </span>
            <span className="text-sm font-bengali text-slate-500 dark:text-slate-400">
              ({nextPrayerObj.nameBn})
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {activeLocation ? (
              <button
                type="button"
                onClick={onOpenLocation}
                className="flex items-center gap-1.5 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer group"
                title="Change prayer location"
              >
                <MapPin size={15} className="text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-slate-800 dark:text-slate-200 underline decoration-slate-300 dark:decoration-slate-600 decoration-dotted underline-offset-2">
                  {activeLocation.city}{activeLocation.country ? `, ${activeLocation.country}` : ''}
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenLocation}
                className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
              >
                <MapPin size={15} />
                <span>Select Your Location</span>
              </button>
            )}

            <span className="hidden sm:inline text-slate-300 dark:text-slate-600">•</span>

            <button
              type="button"
              onClick={onOpenSettings}
              className="flex items-center gap-1.5 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer group"
              title="Change calculation method or Asr juristic school"
            >
              <SlidersHorizontal size={13} className="text-slate-400 group-hover:text-emerald-600" />
              <span>
                Method: <span className="font-medium text-slate-800 dark:text-slate-200">{method === 1 ? 'Karachi' : `ID: ${method}`}</span> •{' '}
                <span className="font-medium text-slate-800 dark:text-slate-200">{school === 1 ? 'Hanafi' : 'Shafi\'i'}</span>
              </span>
            </button>
          </div>
        </div>

        {/* Time & Countdown Display */}
        <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-4 p-4 sm:p-5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
          <div className="text-left md:text-right">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
              Scheduled Adhan
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <Clock size={20} className="text-emerald-600 dark:text-emerald-400" />
              <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-slate-900 dark:text-slate-100">
                {displayTime}
              </span>
            </div>
          </div>

          <div className="text-left md:text-right">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
              Time Remaining
            </p>
            <span className="text-base sm:text-lg font-bold font-mono text-emerald-700 dark:text-emerald-400">
              {countdownFormatted}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
          <span>Prayer Interval Window</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {isLive ? `${progressValue}% Elapsed` : 'Awaiting Location'}
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-1000 ease-linear"
            style={{ width: `${progressValue}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span>Timezone: {timezone || activeLocation?.timezone || 'Local solar calculation'}</span>
          {onOpenSettings && (
            <button
              type="button"
              onClick={onOpenSettings}
              className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold inline-flex items-center gap-1"
            >
              <Compass size={12} />
              Adjust Settings
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}

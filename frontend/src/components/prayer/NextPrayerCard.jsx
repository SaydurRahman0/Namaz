import { Clock, MapPin, Compass, AlertCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import { useLocation } from '../../context/LocationContext';

export default function NextPrayerCard({
  nextPrayer = null,
  prayerTime = null,
  countdown = null,
  progress = null,
  locationInfo = null,
  isLive = false,
  className = '',
}) {
  const { location, method, school } = useLocation();
  const activeLocation = locationInfo || location;

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
              Next Prayer Preview
            </span>

            {!isLive ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50">
                <AlertCircle size={11} />
                Awaiting API (Phase 03)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Live Timetable
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {nextPrayer ? nextPrayer.nameEn : 'Upcoming Prayer'}
            </h3>
            {nextPrayer?.nameAr && (
              <span className="arabic-text text-xl text-emerald-700 dark:text-emerald-400 font-semibold" lang="ar">
                {nextPrayer.nameAr}
              </span>
            )}
            {nextPrayer?.nameBn && (
              <span className="text-sm font-bengali text-slate-500 dark:text-slate-400">
                ({nextPrayer.nameBn})
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <MapPin size={15} className="text-emerald-600 dark:text-emerald-400" />
              <span>
                {activeLocation?.city || 'Dhaka'}, {activeLocation?.country || 'Bangladesh'}
              </span>
            </div>

            <span className="hidden sm:inline text-slate-300 dark:text-slate-600">•</span>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Calculation:</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {method === 1 ? 'Karachi' : 'Standard'} • {school === 1 ? 'Hanafi' : 'Shafi\'i'}
              </span>
            </div>
          </div>
        </div>

        {/* Time & Countdown Display */}
        <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-4 p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
          <div className="text-left md:text-right">
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
              Adhan Time
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <Clock size={20} className="text-emerald-600 dark:text-emerald-400" />
              <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-slate-900 dark:text-slate-100">
                {isLive && prayerTime ? prayerTime : '--:--'}
              </span>
            </div>
          </div>

          <div className="text-left md:text-right">
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
              Time Remaining
            </p>
            <span className="text-sm sm:text-base font-semibold font-mono text-emerald-700 dark:text-emerald-400">
              {isLive && countdown ? countdown : '--h --m --s'}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
          <span>Prayer Interval Window</span>
          <span>{isLive && progress !== null ? `${progress}%` : 'Pending Live Sync'}</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-300"
            style={{ width: isLive && progress !== null ? `${progress}%` : '25%' }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span>Real-time calculation activates with prayer API in Phase 03</span>
          <Link
            to="/prayer-times"
            className="text-emerald-700 dark:text-emerald-400 hover:underline font-medium inline-flex items-center gap-1"
          >
            <Compass size={12} />
            Full Prayer Times
          </Link>
        </div>
      </div>
    </Card>
  );
}


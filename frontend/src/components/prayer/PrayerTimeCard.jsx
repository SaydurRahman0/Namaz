import Card from '../common/Card';

export default function PrayerTimeCard({
  _prayerKey,
  nameEn,
  nameAr,
  nameBn,
  rakats,
  time = null,
  isNext = false,
  isCurrent = false,
  isLive = false,
  icon: Icon,
  className = '',
}) {
  return (
    <Card
      variant={isNext || isCurrent ? 'elevated' : 'interactive'}
      padding="md"
      className={`relative overflow-hidden transition-all duration-200 flex flex-col justify-between ${
        isNext
          ? 'ring-2 ring-emerald-500/80 bg-emerald-50/30 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-700'
          : isCurrent
          ? 'ring-2 ring-amber-500/80 bg-amber-50/30 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700'
          : ''
      } ${className}`}
    >
      {/* Active/Next Badge */}
      {isNext && (
        <div className="absolute top-0 right-0">
          <span className="inline-block px-2.5 py-0.5 rounded-bl-xl text-[10px] uppercase font-bold tracking-wider bg-emerald-600 text-white shadow-2xs">
            Next
          </span>
        </div>
      )}
      {!isNext && isCurrent && (
        <div className="absolute top-0 right-0">
          <span className="inline-block px-2.5 py-0.5 rounded-bl-xl text-[10px] uppercase font-bold tracking-wider bg-amber-600 text-white shadow-2xs">
            Current
          </span>
        </div>
      )}

      {/* Card Header: Icon & Prayer Titles */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isNext
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-100/70 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
            }`}
          >
            {Icon && <Icon size={20} />}
          </div>

          {rakats && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {rakats}
            </span>
          )}
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-1">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              {nameEn}
            </h4>
            <span
              className="arabic-text text-base text-emerald-700 dark:text-emerald-400 font-semibold"
              lang="ar"
            >
              {nameAr}
            </span>
          </div>
          <p className="text-xs font-bengali text-slate-500 dark:text-slate-400">
            {nameBn}
          </p>
        </div>
      </div>

      {/* Card Body: Time Display */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-baseline justify-between">
          <span className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-slate-100">
            {isLive && time ? time : '--:--'}
          </span>
          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
            {isLive && time ? 'Adhan' : 'Phase 03'}
          </span>
        </div>

        {!isLive && (
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
            Calculated in Phase 03
          </p>
        )}
      </div>
    </Card>
  );
}

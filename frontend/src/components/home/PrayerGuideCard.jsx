import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Card from '../common/Card';

export default function PrayerGuideCard({
  id,
  nameEn,
  nameAr,
  nameBn,
  rakats,
  sunnah,
  description,
  timeFrame,
}) {
  return (
    <Card
      variant="interactive"
      padding="lg"
      className="flex flex-col justify-between h-full group border-slate-200/80 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700/60"
    >
      <div className="space-y-4">
        {/* Top Badges: Obligatory Rakats & Period */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-100/80 text-emerald-900 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            {rakats}
          </span>
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            {timeFrame}
          </span>
        </div>

        {/* Title & Calligraphy */}
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
              {nameEn}
            </h3>
            <span
              className="arabic-text text-xl text-emerald-700 dark:text-emerald-400 font-semibold"
              lang="ar"
            >
              {nameAr}
            </span>
          </div>
          <p className="text-xs font-bengali text-slate-500 dark:text-slate-400 mt-0.5">
            {nameBn}
          </p>
        </div>

        {/* Short verified description */}
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {description}
        </p>

        {/* Sunnah info note if applicable */}
        {sunnah && (
          <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
            <span className="font-medium text-slate-700 dark:text-slate-300">Sunnah: </span>
            {sunnah}
          </p>
        )}
      </div>

      {/* Footer Link */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
        <Link
          to={`/prayer-guide/${id}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors"
        >
          <span>Explore Step-by-Step Guide</span>
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </Card>
  );
}


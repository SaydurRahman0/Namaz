import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Card from '../common/Card';

export default function DuaCategoryCard({
  categoryId,
  title,
  titleBn,
  description,
  count,
  icon: Icon,
}) {
  return (
    <Card
      variant="interactive"
      padding="lg"
      className="flex flex-col justify-between h-full group border-slate-200/80 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700/60"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            {Icon && <Icon size={24} />}
          </div>

          {count && (
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {count}
            </span>
          )}
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
            {title}
          </h3>
          <p className="text-xs font-bengali text-slate-500 dark:text-slate-400 mt-0.5">
            {titleBn}
          </p>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
        <Link
          to={`/duas?category=${categoryId}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors"
        >
          <span>Explore Category</span>
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </Card>
  );
}


/**
 * Header component for major page sections with title, Arabic calligraphy text, and subtitle.
 */
export default function SectionHeader({
  title,
  titleArabic,
  subtitle,
  badge,
  align = 'center',
  className = '',
}) {
  const isCenter = align === 'center';

  return (
    <div
      className={`mb-8 md:mb-12 ${
        isCenter ? 'text-center mx-auto max-w-2xl' : 'text-left'
      } ${className}`}
    >
      {badge && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 mb-3">
          {badge}
        </div>
      )}

      {titleArabic && (
        <p className="arabic-text text-xl md:text-2xl text-emerald-700 dark:text-emerald-400 font-semibold mb-2">
          {titleArabic}
        </p>
      )}

      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

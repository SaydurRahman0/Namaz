import { Inbox } from 'lucide-react';

/**
 * EmptyState component for displays where no items, search results, or data are available.
 */
export default function EmptyState({
  icon: Icon = Inbox,
  title = 'No items found',
  description = 'There are no items to display at this moment.',
  action,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
        <Icon size={28} aria-hidden="true" />
      </div>

      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
        {title}
      </h3>

      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">
        {description}
      </p>

      {action && <div>{action}</div>}
    </div>
  );
}

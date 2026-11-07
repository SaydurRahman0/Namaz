import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

/**
 * ErrorState component with retry action and accessible alert role.
 */
export default function ErrorState({
  title = 'Unable to load content',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
  className = '',
}) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 ${className}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 flex items-center justify-center mb-4">
        <AlertTriangle size={24} aria-hidden="true" />
      </div>

      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
        {title}
      </h3>

      <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mb-6">
        {message}
      </p>

      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          size="sm"
          icon={RefreshCw}
          className="border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 hover:bg-red-100/50 dark:hover:bg-red-950/50"
        >
          Try Again
        </Button>
      )}
    </div>
  );
}

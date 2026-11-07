/**
 * Accessible Loading Spinner component with ARIA live region.
 */
export default function LoadingSpinner({
  size = 'md',
  className = '',
  label = 'Loading...',
}) {
  const sizeStyles = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`inline-flex flex-col items-center justify-center gap-2 ${className}`}
    >
      <div
        className={`${sizeStyles[size] || sizeStyles.md} border-emerald-200 dark:border-emerald-900 border-t-emerald-600 dark:border-t-emerald-400 rounded-full animate-spin`}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

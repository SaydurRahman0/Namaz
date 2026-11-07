import { forwardRef } from 'react';

/**
 * Accessible Icon-only Button with required aria-label.
 */
const IconButton = forwardRef(function IconButton(
  {
    icon: Icon,
    'aria-label': ariaLabel,
    variant = 'ghost',
    size = 'md',
    type = 'button',
    className = '',
    disabled = false,
    onClick,
    ...props
  },
  ref
) {
  if (!ariaLabel) {
    console.warn('IconButton requires an `aria-label` attribute for accessibility.');
  }

  const baseStyles =
    'inline-flex items-center justify-center rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-95';

  const sizeStyles = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const variantStyles = {
    primary:
      'bg-primary-600 hover:bg-primary-700 text-white focus-visible:ring-primary-500',
    secondary:
      'bg-emerald-50 text-primary-800 hover:bg-emerald-100 dark:bg-slate-800 dark:text-emerald-300 dark:hover:bg-slate-700 focus-visible:ring-emerald-400',
    outline:
      'border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:ring-primary-500',
    ghost:
      'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:ring-slate-400',
  };

  return (
    <button
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.ghost
      } ${className}`}
      {...props}
    >
      {Icon && <Icon size={iconSizes[size] || 20} aria-hidden="true" />}
    </button>
  );
});

export default IconButton;

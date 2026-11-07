import { forwardRef } from 'react';

/**
 * Reusable Card component supporting regular, elevated, outlined, and interactive variants.
 */
const Card = forwardRef(function Card(
  {
    children,
    variant = 'default',
    padding = 'md',
    className = '',
    onClick,
    as: Component = 'div',
    ...props
  },
  ref
) {
  const paddingStyles = {
    none: '',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  const variantStyles = {
    default:
      'bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 shadow-xs',
    elevated:
      'bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 shadow-md',
    outlined:
      'bg-transparent border border-slate-300 dark:border-slate-700',
    interactive:
      'bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 shadow-xs hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700/60 transition-all duration-200 cursor-pointer',
  };

  return (
    <Component
      ref={ref}
      onClick={onClick}
      className={`rounded-2xl ${paddingStyles[padding] || paddingStyles.md} ${
        variantStyles[variant] || variantStyles.default
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
});

export default Card;

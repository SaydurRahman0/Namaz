/**
 * Skeleton placeholder for loading states with shimmer effect.
 */
export default function Skeleton({
  variant = 'rect',
  width,
  height,
  className = '',
}) {
  const variantStyles = {
    text: 'h-4 w-full rounded-md',
    circle: 'rounded-full aspect-square',
    rect: 'rounded-xl',
  };

  const style = {
    width: width || undefined,
    height: height || undefined,
  };

  return (
    <div
      className={`animate-pulse bg-slate-200/80 dark:bg-slate-700/60 ${
        variantStyles[variant] || variantStyles.rect
      } ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

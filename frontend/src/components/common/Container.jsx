/**
 * Responsive layout container with configurable maximum width and padding.
 */
export default function Container({
  children,
  className = '',
  size = 'lg',
  as: Component = 'div',
  ...props
}) {
  const maxSizes = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1400px]',
    full: 'max-w-full',
  };

  return (
    <Component
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${maxSizes[size] || maxSizes.lg} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import IconButton from './IconButton';

/**
 * Reusable ThemeToggle button allowing users to switch between Light and Dark mode.
 */
export default function ThemeToggle({ size = 'md', className = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton
      icon={theme === 'light' ? Moon : Sun}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      size={size}
      variant="ghost"
      onClick={toggleTheme}
      className={`text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white ${className}`}
    />
  );
}

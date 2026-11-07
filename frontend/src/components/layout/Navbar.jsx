import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Compass, BookOpen, Sparkles, Info, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../../utils/constants';
import ThemeToggle from '../common/ThemeToggle';
import Container from '../common/Container';
import IslamicLogo from '../common/IslamicLogo';

const ICON_MAP = {
  '/': Home,
  '/prayer-times': Compass,
  '/prayer-guide': BookOpen,
  '/duas': Sparkles,
  '/about': Info,
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu whenever route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle keyboard Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Prevent background body scrolling when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 transition-colors duration-200">
      <Container size="lg">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo & Title */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
            aria-label="Namaz Guide - Homepage"
          >
            <div className="p-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800/60 group-hover:border-emerald-300 dark:group-hover:border-emerald-700 transition-colors duration-200">
              <IslamicLogo size={28} />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                Namaz Guide
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 -mt-0.5 tracking-wide">
                Daily Prayer &amp; Dua
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-2"
          >
            {NAV_LINKS.map((link) => {
              const Icon = ICON_MAP[link.path];
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                      isActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-semibold shadow-2xs border border-emerald-100 dark:border-emerald-800/60'
                        : 'text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
                    }`
                  }
                >
                  {Icon && <Icon size={16} className="opacity-70" />}
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Header Actions (Theme Toggle & Mobile Menu trigger) */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 min-h-[44px] min-w-[44px]"
            >
              {isMobileMenuOpen ? (
                <X size={22} aria-hidden="true" />
              ) : (
                <Menu size={22} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Animated Dropdown / Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="md:hidden border-t border-slate-200/90 dark:border-slate-800 bg-white/98 dark:bg-slate-900/98 backdrop-blur-md overflow-hidden shadow-lg"
          >
            <div className="px-4 py-3 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {NAV_LINKS.map((link) => {
                const Icon = ICON_MAP[link.path];
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-colors min-h-[46px] ${
                        isActive
                          ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-100 dark:border-emerald-800/60'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      {Icon && <Icon size={18} className="text-emerald-600 dark:text-emerald-400" />}
                      <span>{link.label}</span>
                    </div>
                    <span className="text-xs font-bengali text-slate-400 dark:text-slate-500">
                      {link.labelBn}
                    </span>
                  </NavLink>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

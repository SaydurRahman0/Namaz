import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Compass, BookOpen, MapPin, Calendar, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import Container from '../common/Container';
import Button from '../common/Button';
import IslamicLogo from '../common/IslamicLogo';
import { useLocation } from '../../context/LocationContext';

export default function HeroSection() {
  const { location } = useLocation();
  const shouldReduceMotion = useReducedMotion();

  // Format today's Gregorian date
  const todayFormatted = useMemo(() => {
    try {
      const now = new Date();
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(now);
    } catch {
      return 'Today';
    }
  }, []);

  // Motion variants that respect prefers-reduced-motion
  const fadeIn = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: 'easeOut' },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-emerald-50/50 via-white to-white dark:from-slate-900/60 dark:via-slate-900 dark:to-slate-900 transition-colors">
      {/* Subtle Islamic Geometric Background Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
        >
          <defs>
            <pattern
              id="islamic-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M30 0L60 30L30 60L0 30Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
                className="text-emerald-900/10 dark:text-emerald-400/15"
              />
              <circle
                cx="30"
                cy="30"
                r="4"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
                className="text-emerald-900/15 dark:text-emerald-400/20"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-grid)" />
        </svg>
      </div>

      <Container size="lg" className="relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8"
        >
          {/* Metadata pill: Gregorian date, Hijri estimate, Location */}
          <motion.div
            variants={fadeIn}
            className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 sm:px-4 sm:py-2 rounded-full bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs text-xs sm:text-sm text-slate-600 dark:text-slate-300 backdrop-blur-xs"
          >
            {/* Today's Gregorian Date */}
            <div className="flex items-center gap-1.5 px-2">
              <Calendar size={14} className="text-emerald-600 dark:text-emerald-400" />
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {todayFormatted}
              </span>
            </div>

            <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">•</span>

            {/* Hijri Date Placeholder */}
            <div className="flex items-center gap-1.5 px-2">
              <Sparkles size={14} className="text-amber-500 dark:text-amber-400" />
              <span className="font-medium text-slate-700 dark:text-slate-200">
                Hijri Calendar
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 font-semibold">
                Phase 03 Sync
              </span>
            </div>

            <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">•</span>

            {/* Location Indicator */}
            <div className="flex items-center gap-1.5 px-2">
              <MapPin size={14} className="text-emerald-600 dark:text-emerald-400" />
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {location?.city || 'Dhaka'}, {location?.country || 'Bangladesh'}
              </span>
            </div>
          </motion.div>

          {/* Bismillah Calligraphy & English translation */}
          <motion.div variants={fadeIn} className="space-y-2">
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-emerald-300 dark:to-emerald-700" />
              <IslamicLogo size={24} className="opacity-80" />
              <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-emerald-300 dark:to-emerald-700" />
            </div>

            <p
              className="arabic-text text-2xl sm:text-3xl md:text-4xl text-emerald-800 dark:text-emerald-300 font-semibold tracking-normal pt-1"
              lang="ar"
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium italic">
              &ldquo;In the name of Allah, the Most Gracious, the Most Merciful&rdquo;
            </p>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeIn}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.15]"
          >
            Your Daily Prayer &amp; <br className="hidden sm:inline" />
            <span className="text-emerald-700 dark:text-emerald-400">
              Dua Companion
            </span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            variants={fadeIn}
            className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Stay connected with your daily prayers. Explore prayer times, learn Salah step by step,
            and discover authentic Duas with translations.
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            variants={fadeIn}
            className="flex flex-wrap items-center justify-center gap-3 pt-2 sm:pt-4"
          >
            <Link to="/prayer-guide">
              <Button
                variant="primary"
                size="lg"
                icon={BookOpen}
                iconPosition="left"
                className="w-full sm:w-auto min-w-[200px]"
              >
                Explore Prayer Guide
              </Button>
            </Link>

            <Link to="/prayer-times">
              <Button
                variant="outline"
                size="lg"
                icon={Compass}
                iconPosition="left"
                className="w-full sm:w-auto min-w-[190px]"
              >
                View Prayer Times
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}


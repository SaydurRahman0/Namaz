import { Helmet } from 'react-helmet-async';
import { motion, useReducedMotion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import PrayerTimesPreview from '../components/prayer/PrayerTimesPreview';
import PrayerGuideSection from '../components/home/PrayerGuideSection';
import DuaCategorySection from '../components/home/DuaCategorySection';
import LearningSection from '../components/home/LearningSection';
import DailyReminderSection from '../components/home/DailyReminderSection';
import QuickNavigation from '../components/home/QuickNavigation';

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();

  const sectionVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.45,
        ease: 'easeOut',
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Namaz Guide — Your Daily Islamic Prayer &amp; Dua Companion</title>
        <meta
          name="description"
          content="Stay connected with your daily prayers. Explore daily prayer timetables, learn Salah step by step, and discover authentic Duas and Surahs with Arabic text, Bengali transliteration, and English translation."
        />
        <meta
          name="keywords"
          content="Namaz, Salah, Islamic Prayer, Prayer Times, Dua, Surah, Step by step Salah, Namaz Shikkha, Bengali Dua, Islamic Companion"
        />
      </Helmet>

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Daily Prayer Times Preview (includes Next Prayer Highlight) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={sectionVariants}
      >
        <PrayerTimesPreview isLive={false} />
      </motion.div>

      {/* 3. Prayer Guide Preview Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={sectionVariants}
      >
        <PrayerGuideSection />
      </motion.div>

      {/* 4. Dua & Surah Introduction Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={sectionVariants}
      >
        <DuaCategorySection />
      </motion.div>

      {/* 5. Step-by-Step Learning Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={sectionVariants}
      >
        <LearningSection />
      </motion.div>

      {/* 6. Daily Islamic Reminder Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={sectionVariants}
      >
        <DailyReminderSection />
      </motion.div>

      {/* 7. Quick Navigation Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={sectionVariants}
      >
        <QuickNavigation />
      </motion.div>
    </>
  );
}

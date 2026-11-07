import { Link } from 'react-router-dom';
import { Sunrise, Sun, SunMedium, Sunset, Moon, ArrowRight, Info } from 'lucide-react';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';
import NextPrayerCard from './NextPrayerCard';
import PrayerTimeCard from './PrayerTimeCard';

const PRAYERS_DATA = [
  {
    key: 'fajr',
    nameEn: 'Fajr',
    nameAr: 'الفجر',
    nameBn: 'ফজর',
    rakats: '2 Rakat Farz',
    icon: Sunrise,
    description: 'Dawn Prayer',
  },
  {
    key: 'dhuhr',
    nameEn: 'Dhuhr',
    nameAr: 'الظهر',
    nameBn: 'যোহর',
    rakats: '4 Rakat Farz',
    icon: Sun,
    description: 'Noon Prayer',
    isNext: true, // Marked as next preview item for UI demonstration
  },
  {
    key: 'asr',
    nameEn: 'Asr',
    nameAr: 'العصر',
    nameBn: 'আসর',
    rakats: '4 Rakat Farz',
    icon: SunMedium,
    description: 'Afternoon Prayer',
  },
  {
    key: 'maghrib',
    nameEn: 'Maghrib',
    nameAr: 'المغرب',
    nameBn: 'মাগরিব',
    rakats: '3 Rakat Farz',
    icon: Sunset,
    description: 'Sunset Prayer',
  },
  {
    key: 'isha',
    nameEn: 'Isha',
    nameAr: 'العشاء',
    nameBn: 'ইশা',
    rakats: '4 Rakat Farz',
    icon: Moon,
    description: 'Night Prayer',
  },
];

export default function PrayerTimesPreview({ isLive = false, prayerTimings = null }) {
  const nextPrayerItem = PRAYERS_DATA.find((p) => p.isNext) || PRAYERS_DATA[1];

  return (
    <section className="py-14 sm:py-20 bg-slate-50/60 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <Container size="lg">
        <SectionHeader
          badge="Daily Timetable"
          titleArabic="أَوْقَاتُ الصَّلَاةِ"
          title="Daily Prayer Timetable"
          subtitle="Timetable schedule for the five obligatory daily prayers. Accurate calculation formulas and location synchronization activate in Phase 03."
        />

        {/* Next Prayer Highlight Card */}
        <div className="max-w-4xl mx-auto mb-10">
          <NextPrayerCard
            isLive={isLive}
            nextPrayer={nextPrayerItem}
            prayerTime={prayerTimings?.[nextPrayerItem.key]}
          />
        </div>

        {/* Five Prayer Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mb-8">
          {PRAYERS_DATA.map((prayer) => (
            <PrayerTimeCard
              key={prayer.key}
              prayerKey={prayer.key}
              nameEn={prayer.nameEn}
              nameAr={prayer.nameAr}
              nameBn={prayer.nameBn}
              rakats={prayer.rakats}
              icon={prayer.icon}
              isNext={prayer.isNext}
              isLive={isLive}
              time={prayerTimings?.[prayer.key]}
            />
          ))}
        </div>

        {/* Informative Note & CTA */}
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
          <div className="flex items-start gap-2.5 text-xs text-slate-500 dark:text-slate-400">
            <Info size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <p>
              Actual prayer timings will be calculated based on your GPS coordinates and chosen calculation method (e.g. Karachi / Hanafi) in Phase 03.
            </p>
          </div>

          <Link to="/prayer-times" className="shrink-0 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              Full Timetable
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}


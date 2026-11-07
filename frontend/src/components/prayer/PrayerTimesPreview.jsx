import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sunrise, Sun, SunMedium, Sunset, Moon, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';
import Container from '../common/Container';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';
import NextPrayerCard from './NextPrayerCard';
import PrayerTimeCard from './PrayerTimeCard';
import LocationPromptCard from './LocationPromptCard';
import LocationSelectorModal from './LocationSelectorModal';
import CalculationSettingsModal from './CalculationSettingsModal';
import { useLocation } from '../../context/LocationContext';
import { usePrayerTimes } from '../../hooks/usePrayerTimes';
import { calculateNextPrayer } from '../../utils/prayerTimeUtils';

const PRAYERS_CONFIG = [
  { key: 'fajr', nameEn: 'Fajr', nameAr: 'الفجر', nameBn: 'ফজর', rakats: '2 Rakat Farz', icon: Sunrise },
  { key: 'dhuhr', nameEn: 'Dhuhr', nameAr: 'الظهر', nameBn: 'যোহর', rakats: '4 Rakat Farz', icon: Sun },
  { key: 'asr', nameEn: 'Asr', nameAr: 'العصر', nameBn: 'আসর', rakats: '4 Rakat Farz', icon: SunMedium },
  { key: 'maghrib', nameEn: 'Maghrib', nameAr: 'المغرب', nameBn: 'মাগরিব', rakats: '3 Rakat Farz', icon: Sunset },
  { key: 'isha', nameEn: 'Isha', nameAr: 'العشاء', nameBn: 'ইশা', rakats: '4 Rakat Farz', icon: Moon },
];

export default function PrayerTimesPreview() {
  const { location, hasLocation, method, school } = useLocation();
  const { timings, meta, isLoading, error, refetch } = usePrayerTimes({
    location,
    method,
    school,
  });

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const prayerCalculation = useMemo(() => {
    if (!timings) return null;
    return calculateNextPrayer(timings, meta?.timezone);
  }, [timings, meta?.timezone]);

  return (
    <section className="py-14 sm:py-20 bg-slate-50/60 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <Container size="lg">
        <SectionHeader
          badge="Live Timetable"
          titleArabic="أَوْقَاتُ الصَّلَاةِ"
          title="Daily Prayer Timetable"
          subtitle="Real-time prayer timings calculated from your geographic location and verified regional calculation methods."
        />

        {/* If user has not chosen a location yet: prompt to detect or select */}
        {!hasLocation ? (
          <div className="max-w-2xl mx-auto mb-10">
            <LocationPromptCard />
          </div>
        ) : error ? (
          /* Error State with Retry Button */
          <div className="max-w-md mx-auto p-6 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-center space-y-4 mb-10">
            <AlertCircle size={32} className="text-red-500 mx-auto" />
            <div>
              <h4 className="text-base font-bold text-red-900 dark:text-red-200">
                Failed to Load Prayer Times
              </h4>
              <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                {error}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={RefreshCw}
              onClick={refetch}
              isLoading={isLoading}
              className="mx-auto"
            >
              Retry Connection
            </Button>
          </div>
        ) : (
          <>
            {/* Live Next Prayer Card with Real Countdown */}
            <div className="max-w-4xl mx-auto mb-10">
              <NextPrayerCard
                timings={timings}
                timezone={meta?.timezone}
                locationInfo={location}
                isLive={Boolean(timings && !isLoading)}
                onOpenLocation={() => setIsLocationModalOpen(true)}
                onOpenSettings={() => setIsSettingsModalOpen(true)}
              />
            </div>

            {/* Five Obligatory Prayer Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mb-8">
              {PRAYERS_CONFIG.map((prayer) => {
                const isNext = prayerCalculation?.nextPrayer?.key === prayer.key;
                const isCurrent = prayerCalculation?.currentPrayer?.key === prayer.key;

                return (
                  <PrayerTimeCard
                    key={prayer.key}
                    prayerKey={prayer.key}
                    nameEn={prayer.nameEn}
                    nameAr={prayer.nameAr}
                    nameBn={prayer.nameBn}
                    rakats={prayer.rakats}
                    icon={prayer.icon}
                    isNext={isNext}
                    isCurrent={isCurrent}
                    isLive={Boolean(timings && !isLoading)}
                    time={timings?.[prayer.key]}
                  />
                );
              })}
            </div>
          </>
        )}

        {/* Footer Actions / Navigation Link */}
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {hasLocation ? (
              <span>
                Timetable for <strong className="text-slate-700 dark:text-slate-200">{location.city}</strong> • Method:{' '}
                <strong className="text-slate-700 dark:text-slate-200">{method === 1 ? 'Karachi' : `ID ${method}`}</strong> ({school === 1 ? 'Hanafi' : 'Shafi\'i'})
              </span>
            ) : (
              <span>Select your location above to activate the live prayer countdown and timetable.</span>
            )}
          </div>

          <Link to="/prayer-times" className="shrink-0 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              Full Timetable &amp; Calendar
            </Button>
          </Link>
        </div>
      </Container>

      {/* Modals for Location and Settings */}
      <LocationSelectorModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
      <CalculationSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </section>
  );
}

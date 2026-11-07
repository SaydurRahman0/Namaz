import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  MapPin,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  RotateCcw,
  RefreshCw,
  AlertCircle,
  Clock,
  Sunrise,
  Sun,
  SunMedium,
  Sunset,
  Moon,
  Sparkles,
} from 'lucide-react';
import Container from '../components/common/Container';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import NextPrayerCard from '../components/prayer/NextPrayerCard';
import PrayerTimeCard from '../components/prayer/PrayerTimeCard';
import LocationPromptCard from '../components/prayer/LocationPromptCard';
import LocationSelectorModal from '../components/prayer/LocationSelectorModal';
import CalculationSettingsModal from '../components/prayer/CalculationSettingsModal';
import { useLocation } from '../context/LocationContext';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { calculateNextPrayer } from '../utils/prayerTimeUtils';

function formatDateIso(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const ALL_PRAYERS = [
  { key: 'fajr', nameEn: 'Fajr', nameAr: 'الفجر', nameBn: 'ফজর', rakats: '2 Rakat Farz', icon: Sunrise, period: 'Dawn' },
  { key: 'sunrise', nameEn: 'Sunrise', nameAr: 'الشروق', nameBn: 'সূর্যোদয়', rakats: 'Islamic Sunrise', icon: Sunrise, period: 'Sunrise', isSunrise: true },
  { key: 'dhuhr', nameEn: 'Dhuhr', nameAr: 'الظهر', nameBn: 'যোহর', rakats: '4 Rakat Farz', icon: Sun, period: 'Noon' },
  { key: 'asr', nameEn: 'Asr', nameAr: 'العصر', nameBn: 'আসর', rakats: '4 Rakat Farz', icon: SunMedium, period: 'Afternoon' },
  { key: 'maghrib', nameEn: 'Maghrib', nameAr: 'المغرب', nameBn: 'মাগরিব', rakats: '3 Rakat Farz', icon: Sunset, period: 'Sunset' },
  { key: 'isha', nameEn: 'Isha', nameAr: 'العشاء', nameBn: 'ইশা', rakats: '4 Rakat Farz', icon: Moon, period: 'Night' },
];

export default function PrayerTimesPage() {
  const { location, hasLocation, method, school } = useLocation();

  const todayIso = useMemo(() => formatDateIso(new Date()), []);
  const [selectedDate, setSelectedDate] = useState(todayIso);
  const [use24Hour, setUse24Hour] = useState(false);

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const isToday = selectedDate === todayIso;

  const { timings, gregorianDate, hijriDate, meta, isLoading, error, refetch } = usePrayerTimes({
    location,
    method,
    school,
    date: selectedDate,
  });

  // Calculate next prayer and countdown (active when viewing today)
  const prayerCalculation = useMemo(() => {
    if (!timings || !isToday) return null;
    return calculateNextPrayer(timings, meta?.timezone);
  }, [timings, meta?.timezone, isToday]);

  // Date Navigation handlers
  const handlePrevDay = () => {
    const current = new Date(`${selectedDate}T00:00:00`);
    current.setDate(current.getDate() - 1);
    setSelectedDate(formatDateIso(current));
  };

  const handleNextDay = () => {
    const current = new Date(`${selectedDate}T00:00:00`);
    current.setDate(current.getDate() + 1);
    setSelectedDate(formatDateIso(current));
  };

  const handleReturnToday = () => {
    setSelectedDate(todayIso);
  };

  return (
    <>
      <Helmet>
        <title>
          {location
            ? `Prayer Times in ${location.city} — Accurate Islamic Timetable`
            : 'Prayer Times — Islamic Daily Companion'}
        </title>
        <meta
          name="description"
          content="Accurate daily prayer times for Fajr, Dhuhr, Asr, Maghrib, and Isha with astronomical calculation and live countdown."
        />
      </Helmet>

      <div className="py-8 sm:py-12 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
        <Container size="lg">
          <SectionHeader
            badge="Astronomical Timetable"
            titleArabic="أَوْقَاتُ الصَّلَاةِ الْيَوْمِيَّةُ"
            title="Islamic Prayer Timetable"
            subtitle="Accurate prayer schedules calculated based on your geographic coordinates, verified solar position, and regional calculation authorities."
          />

          {/* Top Control Bar: Location, Settings & 12h/24h Format */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 mb-8">
            {/* Location Indicator & Change Action */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                  Current Location
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {hasLocation ? `${location.city}, ${location.country}` : 'No Location Selected'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsLocationModalOpen(true)}
                    className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline font-semibold"
                  >
                    (Change)
                  </button>
                </div>
              </div>
            </div>

            {/* Calculation Settings Summary & Toggle */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                icon={Sliders}
                onClick={() => setIsSettingsModalOpen(true)}
              >
                Settings: {method === 1 ? 'Karachi' : `Method ${method}`} ({school === 1 ? 'Hanafi' : 'Shafi\'i'})
              </Button>

              <button
                type="button"
                onClick={() => setUse24Hour((prev) => !prev)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Toggle 12-hour or 24-hour time format"
              >
                Format: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{use24Hour ? '24h' : '12h'}</span>
              </button>
            </div>
          </div>

          {/* If location is NOT chosen yet: show prompt */}
          {!hasLocation ? (
            <div className="max-w-2xl mx-auto my-8">
              <LocationPromptCard />
            </div>
          ) : (
            <>
              {/* Date Navigation Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 shadow-2xs mb-8">
                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={ChevronLeft}
                    onClick={handlePrevDay}
                    aria-label="Previous day timetable"
                  >
                    Prev
                  </Button>

                  <Button
                    variant={isToday ? 'primary' : 'outline'}
                    size="sm"
                    icon={RotateCcw}
                    onClick={handleReturnToday}
                  >
                    Today
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    icon={ChevronRight}
                    iconPosition="right"
                    onClick={handleNextDay}
                    aria-label="Next day timetable"
                  >
                    Next
                  </Button>
                </div>

                {/* Gregorian & Hijri Date Display */}
                <div className="text-center sm:text-right space-y-0.5">
                  <div className="flex items-center justify-center sm:justify-end gap-2 text-sm font-bold text-slate-900 dark:text-slate-100">
                    <CalendarIcon size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span>
                      {gregorianDate?.readable ||
                        new Date(`${selectedDate}T00:00:00`).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                    </span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-end gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                    <Sparkles size={12} className="text-amber-500" />
                    <span>{hijriDate?.formatted || 'Hijri Date Syncing...'}</span>
                    {hijriDate?.formattedAr && (
                      <span className="arabic-text text-xs opacity-75">
                        ({hijriDate.formattedAr})
                      </span>
                    )}
                  </div>
                </div>

                {/* Direct Date Picker */}
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => e.target.value && setSelectedDate(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    aria-label="Select custom date"
                  />
                </div>
              </div>

              {/* Error Banner with Retry */}
              {error && (
                <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-center space-y-4 mb-8">
                  <AlertCircle size={32} className="text-red-500 mx-auto" />
                  <div>
                    <h4 className="text-base font-bold text-red-900 dark:text-red-200">
                      Failed to Retrieve Timetable
                    </h4>
                    <p className="text-xs text-red-700 dark:text-red-300 mt-1">{error}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={RefreshCw}
                    onClick={refetch}
                    isLoading={isLoading}
                    className="mx-auto"
                  >
                    Retry Request
                  </Button>
                </div>
              )}

              {/* If viewing today: Live Next Prayer Card with countdown */}
              {isToday && !error && (
                <div className="mb-10">
                  <NextPrayerCard
                    timings={timings}
                    timezone={meta?.timezone}
                    locationInfo={location}
                    isLive={Boolean(timings && !isLoading)}
                    onOpenLocation={() => setIsLocationModalOpen(true)}
                    onOpenSettings={() => setIsSettingsModalOpen(true)}
                  />
                </div>
              )}

              {/* If viewing another day: Informational Banner */}
              {!isToday && !error && (
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-800 dark:text-amber-300 mb-8">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-amber-600 shrink-0" />
                    <span>
                      Viewing scheduled prayer times for <strong>{selectedDate}</strong>. Live countdown is active for today&apos;s prayers.
                    </span>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleReturnToday} className="shrink-0">
                    Return to Today
                  </Button>
                </div>
              )}

              {/* Six Prayer Cards (Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 mb-10">
                {ALL_PRAYERS.map((prayer) => {
                  const isNext = isToday && prayerCalculation?.nextPrayer?.key === prayer.key;
                  const isCurrent = isToday && prayerCalculation?.currentPrayer?.key === prayer.key;

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
                      use24Hour={use24Hour}
                      time={timings?.[prayer.key]}
                    />
                  );
                })}
              </div>

              {/* Timetable Details & Scholarly Notes Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Clock size={18} className="text-emerald-600 dark:text-emerald-400" />
                  <span>Timetable Metadata &amp; Conventions</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Astronomical Method
                    </span>
                    <p className="text-slate-500 dark:text-slate-400">
                      {meta?.method?.name || (method === 1 ? 'University of Islamic Sciences, Karachi' : `Method ${method}`)}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Asr Juristic Standard
                    </span>
                    <p className="text-slate-500 dark:text-slate-400">
                      {school === 1 ? 'Hanafi (Shadow length = 2x object)' : 'Shafi\'i, Maliki, Hanbali (Shadow length = 1x object)'}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Timezone &amp; Coordinates
                    </span>
                    <p className="text-slate-500 dark:text-slate-400">
                      {meta?.timezone || 'Local solar time'} ({location?.latitude?.toFixed(3)}°, {location?.longitude?.toFixed(3)}°)
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                  * All prayer times are determined using solar angles and local geographic coordinates via the verified AlAdhan API. Individual mosques may apply local adjustment offsets ($\pm 2$ minutes) for congregation purposes.
                </p>
              </div>
            </>
          )}
        </Container>
      </div>

      {/* Modals for Location and Settings */}
      <LocationSelectorModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
      <CalculationSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </>
  );
}

import { Helmet } from 'react-helmet-async';

export default function PrayerTimesPage() {
  return (
    <>
      <Helmet>
        <title>Prayer Times — Islamic Prayer & Dua Guide</title>
        <meta name="description" content="Accurate daily prayer times for Fajr, Dhuhr, Asr, Maghrib, and Isha based on your location." />
      </Helmet>
      <div className="min-h-screen max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">
          Prayer Times
        </h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark">
          Prayer times with live API integration will be built in Phase 03.
        </p>
      </div>
    </>
  );
}
